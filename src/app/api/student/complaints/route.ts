// src/app/api/student/complaints/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

// 1. GET: Fetch enrolled courses (for dropdown) and submitted complaints
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!studentUser) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Fetch enrolled courses for dropdown
    const enrollments = await db.courseEnrollment.findMany({
      where: { studentId: studentUser.id },
      include: { course: true },
    });

    const enrolledCourses = enrollments.map((e) => ({
      id: e.course.id,
      code: e.course.code,
      title: e.course.title,
    }));

    // Fetch filed complaints
    const complaints = await db.complaint.findMany({
      where: { studentId: studentUser.id },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });

    const formattedComplaints = complaints.map((c) => {
      const statusMap: Record<string, string> = {
        PENDING: 'Pending',
        UNDER_REVIEW: 'Under Review',
        RESOLVED: 'Resolved',
        REJECTED: 'Rejected',
      };

      return {
        id: c.id,
        courseId: c.courseId,
        course: c.course?.code || 'General',
        issue: c.description,
        date: new Date(c.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'Africa/Lagos',
        }),
        status: statusMap[c.status] || 'Pending',
        resolutionNote: c.response || 'Submitted to Admin desk for verification.',
      };
    });

    return NextResponse.json({
      enrolledCourses,
      complaintsList: formattedComplaints,
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. POST: Submit a new attendance dispute/complaint
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId, title, description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: 'Complaint description is required' }, { status: 400 });
    }

    const studentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!studentUser) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Create complaint record in database
    const newComplaint = await db.complaint.create({
      data: {
        title: title || 'Attendance Dispute',
        description,
        studentId: studentUser.id,
        courseId: courseId || null,
        status: 'PENDING',
      },
      include: { course: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Dispute logged successfully!',
      complaint: {
        id: newComplaint.id,
        course: newComplaint.course?.code || 'General',
        issue: newComplaint.description,
        date: new Date(newComplaint.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'Africa/Lagos',
        }),
        status: 'Pending',
        resolutionNote: 'Submitted to Admin desk for verification.',
      },
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}