import { NextResponse } from 'next/server';
import client from '../../../lib/mongodb';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const db = await client.connect();
  const user = await db
    .db("payment-manager")
    .collection("users")
    .findOne({ email });

  if (user) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  const newUser = await db
    .db("payment-manager")
    .collection("users")
    .insertOne({ name, email, password });

  return NextResponse.json({ message: 'User registered', user: { id: newUser.insertedId, name, email } }, { status: 201 });
}