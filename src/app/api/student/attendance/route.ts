// src/app/api/student/attendance/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First find the student using their session email to get their actual database id
    const studentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!studentUser) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Fetch student with enrollments and attendance logs using their correct studentUser.id
    const student: any = await db.user.findUnique({
      where: { id: studentUser.id },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                attendanceSessions: {
                  include: {
                    logs: {
                      where: { studentId: studentUser.id }
                    }
                  }
                }
              }
            }
          }
        },
        attendanceLogs: {
          where: { studentId: studentUser.id },
          include: {
            session: {
              include: {
                course: true
              }
            }
          },
          orderBy: { markedAt: 'desc' },
          take: 50
        }
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // 1. Calculate course-level summary statistics
    const courseAttendanceSummary = (student.enrollments || []).map((enrollment: any) => {
      const course = enrollment.course;
      const totalSessions = course.attendanceSessions?.length || 0;
      
      let presentCount = 0;
      (course.attendanceSessions || []).forEach((session: any) => {
        const userLog = (session.logs || []).find((l: any) => l.status === 'PRESENT');
        if (userLog) presentCount++;
      });

      const percentage = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
      const status = percentage >= 75 ? 'Good standing' : 'Below requirement';

      return {
        id: course.id,
        code: course.code,
        title: course.title,
        present: presentCount,
        total: totalSessions,
        status,
      };
    });

    // 2. Format recent session logs
    const recentSessionLogs = (student.attendanceLogs || []).map((log: any) => {
      const statusMap: Record<string, string> = {
        PRESENT: 'Present',
        LATE: 'Late',
        ABSENT: 'Absent'
      };

      return {
        id: log.id,
        courseCode: log.session?.course?.code || 'N/A',
        date: new Date(log.markedAt || log.createdAt || Date.now()).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'Africa/Lagos',
        }),
        status: statusMap[log.status] || 'Absent',
      };
    });

    return NextResponse.json({
      courseAttendanceSummary,
      recentSessionLogs,
    });
  } catch (error) {
    console.error('Error fetching attendance history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}