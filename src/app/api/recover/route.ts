import { NextResponse } from 'next/server';
import client from '../../../lib/mongodb';
import crypto from 'crypto';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  const db = await client.connect();

  const users = db
    .db('payment-manager')
    .collection('users');

  const user = await users.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'If that email exists, a recovery link has been sent.' }, { status: 200 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  // Create a temporary password and email it to the user. In a real app we need to create a hashed token with a recovery link...
  const temporaryPassword = crypto.randomBytes(8).toString('hex');

  try {
    const resend = new Resend(resendApiKey);

    // Use the "from" provided by Resend to avoid setting up a domain
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password recovery',
      html: `<p>Hi ${user.name ?? ''},</p>
<p>New password: ${temporaryPassword}</p>`,
    });

    await users.updateOne(
      { email },
      { $set: { password: temporaryPassword } }
    );
  } catch (err) {
    console.error('Resend email error:', err);
  }

  return NextResponse.json({ message: 'If that email exists, a recovery link has been sent.' }, { status: 200 });
}