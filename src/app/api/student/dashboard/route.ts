import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // 1. Authenticate student session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    // 2. Retrieve student record with the correct Prisma relation names
    const student: any = await (db.user as any).findUnique({
      where: { email: session.user.email },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                attendanceSessions: true,
              },
            },
          },
        },
        attendanceLogs: {
          take: 10,
          include: {
            session: {
              include: {
                course: true,
              },
            },
          },
        },
        filedComplaints: { // Corrected from 'complaints' to match your Prisma schema
          include: {
            course: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student record not found.' }, { status: 404 });
    }

    // 3. Compute course attendance stats safely
    let totalClasses = 0;
    let totalPresent = 0;

    const courseStats = (student.enrollments || []).map((enrollment: any) => {
      const course = enrollment.course || {};
      const totalCourseSessions = course.attendanceSessions?.length || 0;
      
      const attendedSessions = (student.attendanceLogs || []).filter(
        (log: any) => log.session?.courseId === course.id && log.status === 'PRESENT'
      ).length;

      totalClasses += totalCourseSessions;
      totalPresent += attendedSessions;

      return {
        code: course.code || 'N/A',
        title: course.title || 'Untitled Course',
        present: attendedSessions,
        total: totalCourseSessions,
      };
    });

    const overallPercentage = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

    // 4. Fetch live active sessions for notifications
    const enrolledCourseIds = (student.enrollments || []).map((e: any) => e.courseId).filter(Boolean);
    
    let activeSessions: any[] = [];
    if (enrolledCourseIds.length > 0) {
      activeSessions = await db.attendanceSession.findMany({
        where: {
          courseId: { in: enrolledCourseIds },
          status: 'ACTIVE',
        },
        include: {
          course: true,
        },
      }).catch(() => []);
    }

    const notifications = activeSessions.map((act: any) => ({
      id: act.id.toString(),
      color: 'bg-cyan-700',
      text: `${act.course?.code || 'Course'} attendance is currently open.`,
    }));

    // 5. Format recent attendance history logs (with WAT timezone)
    const attendanceHistory = (student.attendanceLogs || []).map((log: any) => ({
      id: log.id,
      courseCode: log.session?.course?.code || 'N/A',
      courseTitle: log.session?.course?.title || 'N/A',
      date: new Date(log.createdAt || log.date || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Africa/Lagos',
      }),
      status: log.status === 'PRESENT' ? 'Present' : 'Absent',
    }));

    // 6. Format complaints list using filedComplaints (with WAT timezone)
    const complaintsList = (student.filedComplaints || []).map((comp: any) => ({
      id: comp.id,
      course: comp.course?.code || 'N/A',
      issue: comp.description || comp.issue || 'No details provided',
      date: new Date(comp.createdAt || comp.date || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Africa/Lagos',
      }),
      status: comp.status || 'Pending',
    }));

    // 7. Return complete aggregated dashboard payload
    return NextResponse.json({
      studentName: student.fullName || student.name || 'Student',
      matricNumber: student.matricNumber || 'N/A',
      overallPercentage,
      totalPresent,
      totalClasses,
      courses: courseStats,
      notifications,
      attendanceHistory,
      complaintsList,
    });
  } catch (error: any) {
    console.error('SERVER_DASHBOARD_CRASH:', error.message, error.stack);
    return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
  }
}