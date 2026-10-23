import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 1. Look up the token in PostgreSQL
    const resetRequest = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRequest) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset token.' },
        { status: 400 }
      );
    }

    // 2. Check if the token has expired
    if (new Date() > new Date(resetRequest.expiresAt)) {
      // Clean up expired token
      await db.passwordResetToken.delete({ where: { token } });
      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update the user's password in the database
    await db.user.update({
      where: { email: resetRequest.email },
      data: { passwordHash: hashedPassword },
    });

    // 5. Delete the token so it cannot be reused
    await db.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({
      message: 'Password reset successfully! You can now sign in with your new password.',
    });
  } catch (error: any) {
    console.error('RESET_PASSWORD_ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}