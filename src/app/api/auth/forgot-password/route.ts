import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    // 1. Check if the user exists
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Security practice: Always return a success response even if the user isn't found
    // or if the user record doesn't have an email attached, to prevent email enumeration.
    if (!user || !user.email) {
      return NextResponse.json({
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    // 2. Generate a secure 32-byte hex token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // Expires in 15 minutes

    // 3. Delete any existing reset tokens for this email to avoid duplicates
    await db.passwordResetToken.deleteMany({
      where: { email: user.email },
    });

    // 4. Save the new token in Neon DB
    await db.passwordResetToken.create({
      data: {
        email: user.email,
        token: resetToken,
        expiresAt: tokenExpiry,
      },
    });

    // 5. Construct the reset URL
    const domain = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${domain}/reset-password?token=${resetToken}`;

    // 🛑 FOR LOCAL DEVELOPMENT: Log the reset URL directly to your terminal
    console.log('----------------------------------------------------');
    console.log(`PASSWORD RESET LINK FOR ${user.email}:`);
    console.log(resetUrl);
    console.log('----------------------------------------------------');

    // (In production, you would trigger an email sender service like Resend/Nodemailer here)

    return NextResponse.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  } catch (error: any) {
    console.error('FORGOT_PASSWORD_ERROR:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}