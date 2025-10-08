import client from '@/lib/mongodb';
import { getAuthUser } from '@/utils/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const authUser = await getAuthUser();

  const db = await client.connect();
  const user = await db
    .db('payment-manager')
    .collection('users')
    .findOne({ _id: new ObjectId(authUser?.sub) }, { projection: { password: 0 } });

  return NextResponse.json(user || null);
}
