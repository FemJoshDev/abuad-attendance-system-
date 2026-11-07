// src/app/student/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DashboardData } from '@/types/student';

export default function StudentDashboard() {
  // Dynamic Dashboard States
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Complaint Module State
  const [selectedCourse, setSelectedCourse] = useState('');
  const [complaintText, setComplaintText] = useState('');

  // Fetch live student dashboard metrics from backend API on mount
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/student/dashboard');
        if (!res.ok) throw new Error('Failed to load dashboard data from server.');
        const json = await res.json();
        setData(json);

        // Automatically select the student's first registered course if available
        if (json.courses && json.courses.length > 0) {
          setSelectedCourse(json.courses[0].code);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim() || !data) return;

    try {
      const res = await fetch('/api/student/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course: selectedCourse, issue: complaintText }),
      });

      if (!res.ok) throw new Error('Failed to submit complaint.');

      const newComp = await res.json();
      setData({
        ...data,
        complaintsList: [newComp, ...data.complaintsList],
      });
      setComplaintText('');
      alert('Your attendance complaint has been submitted to the Admin desk!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-[#590018] font-semibold">
        Loading live student portal metrics...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-[#590018] gap-4">
        <p>Error: {error || 'Unable to retrieve records.'}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#590018] text-white rounded-md text-xs cursor-pointer">
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="text-[#171717]">

      {/* Desktop Header Bar */}
      <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Student dashboard</p>
          <h1 className="mt-1 text-lg font-semibold">College of Medicine &amp; Health Sciences</h1>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">{data.studentName}</p>
          <p className="mt-0.5 text-xs text-[#746d68]">{data.matricNumber}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10">

        {/* Overview & Notifications Section Grid */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">

          {/* Overall Attendance Summary Card */}
          <section id="overview" className="scroll-mt-24 rounded-lg bg-[#590018] px-7 py-8 text-white shadow-sm sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c3ca]">Semester overview</p>
            <h2 className="mt-3 text-2xl font-medium">Overall Attendance</h2>
            <p className="mt-7 text-[76px] font-bold leading-none tracking-tight">
              {data.overallPercentage}<span className="text-[38px] text-[#f2cf00]">%</span>
            </p>
            <div className="mt-5 h-[9px] overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#e2bd00]" style={{ width: `${data.overallPercentage}%` }} />
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <p><span className="text-lg font-bold text-[#f2cf00]">{data.totalPresent}</span> Present</p>
              <p><span className="text-lg font-bold text-[#f2cf00]">{data.totalClasses}</span> Total Classes</p>
            </div>
            <p className="mt-6 text-sm text-white/90">
              {data.overallPercentage >= 75 ? 'Above the 75% attendance requirement' : 'Warning: Below 75% requirement'}
            </p>
          </section>

          {/* Live Attendance Notifications Panel */}
          <section className="overflow-hidden rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="border-b border-[#ece6dd] px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Stay informed</p>
              <h2 className="mt-3 text-[25px] font-medium leading-snug">Attendance Notifications</h2>
            </div>
            {data.notifications.length === 0 ? (
              <p className="p-6 text-xs text-[#746d68]">No active sessions or alerts right now.</p>
            ) : (
              <ul className="divide-y divide-[#ece6dd]">
                {data.notifications.map((notification) => (
                  <li key={notification.id} className="flex gap-3 px-6 py-4 text-sm leading-5">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${notification.color}`} />
                    <span>{notification.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* My Courses Section */}
        <section id="courses" className="mt-12 scroll-mt-24">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Academic record</p>
              <h2 className="mt-3 text-[27px] font-medium">My Courses</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data.courses.map((course) => {
              const percentage = course.total > 0 ? Math.round((course.present / course.total) * 100) : 0;
              return (
                <article key={course.code} className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-5 shadow-[0_2px_6px_rgba(80,30,30,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[#650019]">{course.code}</h3>
                      <p className="mt-1.5 text-base text-[#514949]">{course.title}</p>
                    </div>
                    <p className="text-[34px] font-semibold leading-none text-cyan-800">{percentage}%</p>
                  </div>
                  <div className="mt-7 flex items-center justify-between gap-2 text-sm">
                    <span>{course.present} / {course.total} classes</span>
                    <span className={percentage >= 75 ? 'text-[#8d7400]' : 'text-[#9c4b2d]'}>
                      {percentage >= 75 ? 'Good standing' : 'Below requirement'}
                    </span>
                  </div>
                  <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-[#e9e7df]">
                    <div className="h-full rounded-full bg-cyan-800" style={{ width: `${percentage}%` }} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Recent Attendance History Table */}
        <section id="attendance" className="mt-12 scroll-mt-24 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Attendance record</p>
          <h2 className="mb-5 mt-2 text-xl font-medium">Recent Attendance History</h2>
          <div className="w-full overflow-x-auto pb-2">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#ece6dd] text-[#766c68]">
                  <th className="pb-3 font-semibold whitespace-nowrap">Course Code</th>
                  <th className="pb-3 font-semibold whitespace-nowrap">Course Title</th>
                  <th className="pb-3 font-semibold whitespace-nowrap">Date</th>
                  <th className="pb-3 text-right font-semibold whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece5]">
                {data.attendanceHistory.map((log) => (
                  <tr key={log.id}>
                    <td className="py-4 font-semibold text-[#650019] whitespace-nowrap">{log.courseCode}</td>
                    <td className="py-4 whitespace-nowrap">{log.courseTitle}</td>
                    <td className="py-4 text-[#655d58] whitespace-nowrap">{log.date}</td>
                    <td className="py-4 text-right whitespace-nowrap">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${log.status === 'Present' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Complaints & Disputes Desk */}
        <section id="complaints" className="mt-12 scroll-mt-24 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Support Desk</p>
          <h2 className="mb-2 mt-2 text-xl font-medium">Log Attendance Complaint / Dispute</h2>
          <p className="text-xs text-[#746d68] mb-6">If you faced location geofence issues or system timeouts during a class, submit details below for administrative review.</p>

          <div className="grid gap-8 lg:grid-cols-3">
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#514949] mb-1">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                >
                  {data.courses.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#514949] mb-1">Describe Issue</label>
                <textarea
                  rows={3}
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="e.g. System timed out while verifying device location in Anatomy lecture."
                  required
                  className="w-full px-3 py-2 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#590018] hover:bg-[#70001f] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition cursor-pointer"
              >
                Submit Dispute
              </button>
            </form>

            <div className="lg:col-span-2 overflow-hidden">
              <h3 className="text-sm font-semibold text-[#650019] mb-3">Submitted Complaints History</h3>
              <div className="w-full overflow-x-auto pb-2">
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#ece6dd] text-[#766c68]">
                      <th className="pb-3 font-semibold whitespace-nowrap">Course</th>
                      <th className="pb-3 font-semibold whitespace-nowrap">Issue Details</th>
                      <th className="pb-3 font-semibold whitespace-nowrap">Date Submitted</th>
                      <th className="pb-3 text-right font-semibold whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece5]">
                    {data.complaintsList.map((comp) => (
                      <tr key={comp.id}>
                        <td className="py-3.5 font-semibold text-[#650019] whitespace-nowrap">{comp.course}</td>
                        <td className="py-3.5 text-[#514949] max-w-[200px] truncate">{comp.issue}</td>
                        <td className="py-3.5 text-[#655d58] whitespace-nowrap">{comp.date}</td>
                        <td className="py-3.5 text-right whitespace-nowrap">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${comp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                            {comp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}