import { NextResponse } from 'next/server';
import client from '../../../lib/mongodb';
import { getAuthUser } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { oldPassword, newPassword } = body || {};

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const auth = await getAuthUser();
    if (!auth || !auth.sub) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const db = await client.connect();
    const users = db.db('payment-manager').collection('users');

    const user = await users.findOne({ _id: new (await import('mongodb')).ObjectId(auth.sub) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.password !== oldPassword) {
      return NextResponse.json({ error: 'Old password does not match' }, { status: 403 });
    }

    await users.updateOne({ _id: user._id }, { $set: { password: newPassword } });

    return NextResponse.json({ message: 'Password updated' }, { status: 200 });
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
