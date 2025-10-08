import { NextResponse } from 'next/server';
import client from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { User } from '@/types/user';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const db = await client.connect();
  const user = await db
    .db('payment-manager')
    .collection<User>('users')
    .findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment');
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Create response and set JWT as a secure, HTTP-only cookie
  const response = NextResponse.json(
    { token, user: { id: user._id.toString(), name: user.name, email: user.email } },
    { status: 200 }
  );

  const secure = process.env.NODE_ENV === 'production';
  response.cookies.set('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, //in seconds (7 days)
  });

  return response;
}