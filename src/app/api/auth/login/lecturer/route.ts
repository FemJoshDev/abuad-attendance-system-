import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // adjust path to match your Prisma db instance
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. Find the user by staff email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid staff email or password.' },
        { status: 401 }
      );
    }

    // 2. Enforce strict role validation for Lecturers
    if (user.role !== 'LECTURER') {
      return NextResponse.json(
        { error: 'Access denied. This portal is strictly for Lecturers.' },
        { status: 403 }
      );
    }

    // 3. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid staff email or password.' },
        { status: 401 }
      );
    }

    // 4. Return user info (session handling / token creation can be attached here)
    return NextResponse.json({
      message: 'Lecturer authentication successful.',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('Lecturer login error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}