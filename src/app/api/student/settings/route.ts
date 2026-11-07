// src/app/api/student/settings/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

// 1. GET: Fetch student profile details for settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const student = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({
      fullName: student.fullName,
      email: student.email,
      matricNumber: student.matricNumber || '',
      college: student.college || 'College of Medicine & Health Sciences (CMHS)',
      department: student.department || 'Medicine and Surgery',
      level: student.level ? student.level.replace('LEVEL_', '') + ' Level' : '100 Level',
    });
  } catch (error) {
    console.error('Error fetching student settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. PATCH: Update Student Matriculation Number or Profile Details
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { matricNumber } = await req.json();

    if (!matricNumber || !matricNumber.trim()) {
      return NextResponse.json({ error: 'Matriculation number is required' }, { status: 400 });
    }

    const student = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Update the student's matric number in PostgreSQL
    const updatedStudent = await db.user.update({
      where: { id: student.id },
      data: { matricNumber: matricNumber.trim() },
    });

    return NextResponse.json({
      success: true,
      message: 'Matriculation number updated successfully!',
      matricNumber: updatedStudent.matricNumber,
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    // Handle Prisma unique constraint violation (if matric number already belongs to another user)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'This matriculation number is already registered to another student account.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}