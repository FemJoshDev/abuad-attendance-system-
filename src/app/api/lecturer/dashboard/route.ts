// src/app/api/lecturer/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

// 1. GET: Fetch assigned courses, active sessions, live attendance count, and CSV export
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lecturer: any = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer record not found' }, { status: 404 });
    }

    if (lecturer.role !== 'LECTURER' && lecturer.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Access restricted to faculty members.' }, { status: 403 });
    }

    const resolvedName =
      lecturer.fullName ||
      lecturer.name ||
      (lecturer.email ? lecturer.email.split('@')[0].replace('.', ' ') : 'Faculty Member');

    // Updated to query the many-to-many 'lecturers' relation
    const courses = await db.course.findMany({
      where: {
        lecturers: {
          some: { id: lecturer.id },
        },
      },
      include: {
        enrollments: true,
      },
    });

    const assignedCourses = courses.map((c) => ({
      id: c.id,
      code: c.code,
      title: c.title,
      studentsEnrolled: c.enrollments.length,
    }));

    const courseIds = courses.map((c) => c.id);
    const activeSession: any = await (db.attendanceSession as any).findFirst({
      where: {
        courseId: { in: courseIds },
        isOpen: true,
      },
      include: {
        course: true,
        logs: true, // Include logs to count live attendance
      },
    });

    // Check if query params ask for CSV export for a specific session ID
    const url = new URL(req.url);
    const exportSessionId = url.searchParams.get('exportSessionId');
    if (exportSessionId) {
      const targetSession = await db.attendanceSession.findUnique({
        where: { id: exportSessionId },
        include: {
          course: true,
          logs: {
            include: { student: true },
          },
        },
      });

      if (targetSession) {
        let csvContent = "Student Name,Matric Number,Email,Status,Distance (m),Marked At\n";
        targetSession.logs.forEach((log: any) => {
          csvContent += `"${log.student.fullName}","${log.student.matricNumber || 'N/A'}","${log.student.email}","${log.status}",${log.distanceMeters || 0},"${log.markedAt.toISOString()}"\n`;
        });

        return new NextResponse(csvContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${targetSession.course.code}_attendance.csv"`,
          },
        });
      }
    }

    return NextResponse.json({
      lecturerName: resolvedName,
      lecturerEmail: lecturer.email,
      assignedCourses,
      activeSession: activeSession
        ? {
            id: activeSession.id,
            courseCode: activeSession.course.code,
            sessionCode: activeSession.sessionCode || activeSession.id.toString().slice(0, 6),
            radiusMeters: activeSession.radiusMeters || 50,
            checkedInCount: activeSession.logs ? activeSession.logs.length : 0,
          }
        : null,
    });
  } catch (error: any) {
    console.error('Error fetching lecturer dashboard:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}

// 2. POST: Start or End an Attendance Session
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, courseId, radiusMeters, latitude, longitude, sessionId } = await req.json();

    const lecturer = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer record not found' }, { status: 404 });
    }

    if (lecturer.role !== 'LECTURER' && lecturer.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Access restricted to faculty members.' }, { status: 403 });
    }

    if (action === 'START') {
      if (!courseId) {
        return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
      }

      if (latitude === undefined || longitude === undefined || latitude === null || longitude === null) {
        return NextResponse.json({ error: 'Live GPS location is required to anchor classroom geofence.' }, { status: 400 });
      }

      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

      const newSession: any = await (db.attendanceSession as any).create({
        data: {
          courseId,
          isOpen: true,
          radiusMeters: radiusMeters || 50,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        include: { course: true },
      });

      return NextResponse.json({
        success: true,
        message: 'Attendance session started!',
        activeSession: {
          id: newSession.id,
          courseCode: newSession.course.code,
          sessionCode: generatedCode,
          radiusMeters: newSession.radiusMeters,
          checkedInCount: 0,
        },
      });
    } else if (action === 'END') {
      if (!sessionId) {
        return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
      }

      await (db.attendanceSession as any).update({
        where: { id: sessionId },
        data: {
          isOpen: false,
          closedAt: new Date(),
        },
      });

      return NextResponse.json({ success: true, message: 'Attendance session ended.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error managing attendance session:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}