// src/types/student.ts

export type CourseRecord = {
  code: string;
  title: string;
  present: number;
  total: number;
};

export type NotificationItem = {
  id: string;
  color: string;
  text: string;
};

export type AttendanceLog = {
  id: number;
  courseCode: string;
  courseTitle: string;
  date: string;
  status: string;
};

export type ComplaintItem = {
  id: number;
  course: string;
  issue: string;
  date: string;
  status: string;
};

export type DashboardData = {
  studentName: string;
  matricNumber: string;
  overallPercentage: number;
  totalPresent: number;
  totalClasses: number;
  courses: CourseRecord[];
  notifications: NotificationItem[];
  attendanceHistory: AttendanceLog[];
  complaintsList: ComplaintItem[];
};