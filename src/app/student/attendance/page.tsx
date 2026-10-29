'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Course-level percentage attendance summary
const courseAttendanceSummary = [
  { id: 1, code: 'MBBS 501', title: 'Anatomy V', present: 18, total: 20, status: 'Good standing' },
  { id: 2, code: 'MBBS 503', title: 'Physiology V', present: 15, total: 20, status: 'Good standing' },
  { id: 3, code: 'MBBS 505', title: 'Biochemistry V', present: 13, total: 21, status: 'Below requirement' },
];

// Recent session logs for quick auditing
const recentSessionLogs = [
  { id: 101, courseCode: 'MBBS 501', date: 'Oct 26, 2026', status: 'Present' },
  { id: 102, courseCode: 'MBBS 503', date: 'Oct 24, 2026', status: 'Present' },
  { id: 103, courseCode: 'MBBS 505', date: 'Oct 22, 2026', status: 'Late' },
  { id: 104, courseCode: 'MBBS 501', date: 'Oct 19, 2026', status: 'Present' },
  { id: 105, courseCode: 'MBBS 503', date: 'Oct 17, 2026', status: 'Absent' },
];

export default function AttendanceHistoryPage() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  const [searchQuery, setSearchQuery] = useState('');

  // Filter logs based on search query
  const filteredLogs = recentSessionLogs.filter((log) => 
    log.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-[#fbf9f0] text-[#171717] overflow-x-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[#fbf9f0]/85 backdrop-blur-[3px]" />
      </div>

      <div className="relative z-10">
        {/* Fixed Burgundy Sidebar Navigation */}
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
          <div className="mb-12 border-b border-white/15 pb-6">
            <p className="text-lg font-bold tracking-wide">ABUAD</p>
            <p className="mt-1 text-xs text-white/65">Student Portal</p>
          </div>
          <nav className="space-y-2 text-sm">
            <Link href="/student/dashboard#overview" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Dashboard</Link>
            <Link href="/student/courses" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">My Courses</Link>
            <Link href="/student/attendance" className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Attendance History</Link>
            <Link href="/student/complaints" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Complaints &amp; Disputes</Link>
            <Link href="/student/settings" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Settings</Link>
          </nav>
          <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
            Sign out
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="min-h-screen lg:ml-[205px]">
          
          {/* Top Header Bar */}
          <header className="flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Audit Trail</p>
              <h1 className="mt-1 text-lg font-semibold">Attendance Standing &amp; History</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{matricNumber}</p>
            </div>
          </header>

          {/* Page Body */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-10">
            
            {/* Section 1: Course Percentage Attendance Standings */}
            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Performance Breakdown</p>
                <h2 className="mt-1 text-2xl font-medium">Course Attendance Percentages</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {courseAttendanceSummary.map((course) => {
                  const percentage = Math.round((course.present / course.total) * 100);
                  return (
                    <article key={course.code} className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-5 shadow-sm space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="rounded-md bg-[#f7f2ec] px-2.5 py-1 text-xs font-bold text-[#650019]">{course.code}</span>
                          <h3 className="mt-2 text-base font-semibold text-[#171717]">{course.title}</h3>
                        </div>
                        <p className="text-3xl font-bold text-cyan-800">{percentage}%</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-[#746d68]">
                          <span>{course.present} / {course.total} classes</span>
                          <span className={percentage >= 75 ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>{course.status}</span>
                        </div>
                        <div className="h-[6px] overflow-hidden rounded-full bg-[#e9e7df]">
                          <div className="h-full rounded-full bg-cyan-800" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Section 2: Recent Session Logs Table */}
            <section className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Logs</p>
                  <h2 className="mt-1 text-xl font-medium">Recent Session History</h2>
                </div>
                <input 
                  type="text"
                  placeholder="Filter by course (e.g. MBBS 501)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ece6dd] text-[#766c68]">
                      <th className="pb-3 font-semibold">Course Code</th>
                      <th className="pb-3 font-semibold">Date Logged</th>
                      <th className="pb-3 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece5]">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="transition hover:bg-[#fbf9f0]/60">
                        <td className="py-3.5 font-semibold text-[#650019]">{log.courseCode}</td>
                        <td className="py-3.5 text-[#514949]">{log.date}</td>
                        <td className="py-3.5 text-right">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            log.status === 'Present' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            log.status === 'Late' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-7 text-center text-xs text-[#817874]">
              Courtesy of the Dean, College of Medicine &amp; Health Sciences, ABUAD
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
