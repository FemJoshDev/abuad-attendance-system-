import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, matricNumber, password, confirmPassword, level, department, college } = body;

    // 1. Basic validation including level & department
    if (!name || !email || !matricNumber || !password || !confirmPassword || !level || !department) {
      return NextResponse.json(
        { error: 'All fields including level and department are required.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 2. Check if student already exists by email or matric number
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { matricNumber: matricNumber.toUpperCase() },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A student with this email or matric number already exists.' },
        { status: 400 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new Student record in PostgreSQL with academic profile mapping
    await db.user.create({
      data: {
        fullName: name,
        email: email.toLowerCase(),
        matricNumber: matricNumber.toUpperCase(),
        passwordHash: hashedPassword,
        role: 'STUDENT',
        level: level, // e.g. "LEVEL_500"
        department: department, // e.g. "Medicine & Surgery"
        college: college || 'College of Medicine & Health Sciences',
      },
    });

    return NextResponse.json(
      { message: 'Registration successful!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign Up Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}