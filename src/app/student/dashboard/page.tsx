'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Sample data for enrolled courses and metrics
const courses = [
  { code: 'MBBS 501', title: 'Anatomy', present: 18, total: 20 },
  { code: 'MBBS 503', title: 'Physiology', present: 15, total: 20 },
  { code: 'MBBS 505', title: 'Biochemistry', present: 13, total: 21 },
];

// Active notifications for student alerts
const notifications = [
  { color: 'bg-cyan-700', text: 'MBBS 501 attendance is currently open.' },
  { color: 'bg-yellow-500', text: 'MBBS 503 attendance closes in 5 minutes.' },
  { color: 'bg-[#650019]', text: 'Your Biochemistry attendance is approaching the required threshold.' },
];

// Historical student attendance logs
const attendanceHistory = [
  { id: 1, courseCode: 'MBBS 501', courseTitle: 'Anatomy', date: 'Oct 26, 2026', status: 'Present' },
  { id: 2, courseCode: 'MBBS 503', courseTitle: 'Physiology', date: 'Oct 24, 2026', status: 'Present' },
  { id: 3, courseCode: 'MBBS 505', courseTitle: 'Biochemistry', date: 'Oct 22, 2026', status: 'Late' },
];

export default function StudentDashboard() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  // Complaint Module State
  const [selectedCourse, setSelectedCourse] = useState('MBBS 501');
  const [complaintText, setComplaintText] = useState('');
  const [complaintsList, setComplaintsList] = useState([
    { id: 1, course: 'MBBS 505', issue: 'Marked absent due to poor network geofence timeout.', date: 'Oct 22, 2026', status: 'Pending' },
    { id: 2, course: 'MBBS 503', issue: 'Device location error during session check-in.', date: 'Oct 18, 2026', status: 'Resolved' },
  ]);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;

    const newComplaint = {
      id: complaintsList.length + 1,
      course: selectedCourse,
      issue: complaintText,
      date: 'Oct 28, 2026',
      status: 'Pending',
    };

    setComplaintsList([newComplaint, ...complaintsList]);
    setComplaintText('');
    alert('Your attendance complaint has been submitted to the Admin desk!');
  };

  return (
    <main className="relative min-h-screen bg-[#fbf9f0] text-[#171717] overflow-x-hidden">
      
      {/* Background Image Layer with subtle opacity over the cream theme */}
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
        {/* Fixed Burgundy Sidebar Navigation for Desktop */}
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
          <div className="mb-12 border-b border-white/15 pb-6">
            <p className="text-lg font-bold tracking-wide">ABUAD</p>
            <p className="mt-1 text-xs text-white/65">Student Portal</p>
          </div>
          <nav className="space-y-2 text-sm">
            <a className="block rounded-md bg-white/12 px-3 py-3 font-semibold" href="#overview">Dashboard</a>
            <a className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition" href="#courses">My Courses</a>
            <a className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition" href="#attendance">Attendance History</a>
            <a className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition" href="#complaints">Complaints & Disputes</a>
            <a className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition" href="#profile">Settings</a>
          </nav>
          <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
            Sign out
          </button>
        </aside>

        {/* Main Content Area Offset by Sidebar Width */}
        <div className="min-h-screen lg:ml-[205px]">
          
          {/* Top Header Bar */}
          <header className="flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Student dashboard</p>
              <h1 className="mt-1 text-lg font-semibold">College of Medicine &amp; Health Sciences</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{matricNumber}</p>
            </div>
          </header>

          {/* Dashboard Body Container */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10">
            
            {/* Overview & Notifications Section Grid */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
              
              {/* Overall Attendance Summary Card */}
              <section id="overview" className="rounded-lg bg-[#590018] px-7 py-8 text-white shadow-sm sm:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c3ca]">Semester overview</p>
                <h2 className="mt-3 text-2xl font-medium">Overall Attendance</h2>
                <p className="mt-7 text-[76px] font-bold leading-none tracking-tight">82<span className="text-[38px] text-[#f2cf00]">%</span></p>
                <div className="mt-5 h-[9px] overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[82%] rounded-full bg-[#e2bd00]" />
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <p><span className="text-lg font-bold text-[#f2cf00]">42</span> Present</p>
                  <p><span className="text-lg font-bold text-[#f2cf00]">51</span> Total Classes</p>
                </div>
                <p className="mt-6 text-sm text-white/90">Above the 75% attendance requirement</p>
              </section>

              {/* Attendance Notifications Panel */}
              <section className="overflow-hidden rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm shadow-sm">
                <div className="border-b border-[#ece6dd] px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Stay informed</p>
                  <h2 className="mt-3 text-[25px] font-medium leading-snug">Attendance Notifications</h2>
                </div>
                <ul className="divide-y divide-[#ece6dd]">
                  {notifications.map((notification) => (
                    <li key={notification.text} className="flex gap-3 px-6 py-4 text-sm leading-5">
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${notification.color}`} />
                      <span>{notification.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* My Courses Section */}
            <section id="courses" className="mt-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Academic record</p>
                  <h2 className="mt-3 text-[27px] font-medium">My Courses</h2>
                </div>
                <div className="flex rounded-md bg-[#eeece4] p-1 text-sm">
                  <button className="rounded bg-[#590018] px-4 py-2.5 font-semibold text-white shadow-sm cursor-pointer">First Semester</button>
                  <button className="rounded px-4 py-2.5 text-[#57494a] hover:bg-black/5 transition cursor-pointer">Second Semester</button>
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {courses.map((course) => {
                  const percentage = Math.round((course.present / course.total) * 100);
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
                        <span className={percentage >= 75 ? 'text-[#8d7400]' : 'text-[#9c4b2d]'}>{percentage >= 75 ? 'Good standing' : 'Below requirement'}</span>
                      </div>
                      <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-[#e9e7df]">
                        <div className="h-full rounded-full bg-cyan-800" style={{ width: `${percentage}%` }} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Attendance History Table Section */}
            <section id="attendance" className="mt-12 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Attendance record</p>
              <h2 className="mb-5 mt-2 text-xl font-medium">Recent Attendance History</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ece6dd] text-[#766c68]">
                      <th className="pb-3 font-semibold">Course Code</th>
                      <th className="pb-3 font-semibold">Course Title</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece5]">
                    {attendanceHistory.map((log) => (
                      <tr key={log.id}>
                        <td className="py-4 font-semibold text-[#650019]">{log.courseCode}</td>
                        <td className="py-4">{log.courseTitle}</td>
                        <td className="py-4 text-[#655d58]">{log.date}</td>
                        <td className="py-4 text-right">
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

            {/* Attendance Complaints & Disputes Desk */}
            <section id="complaints" className="mt-12 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Support Desk</p>
              <h2 className="mb-2 mt-2 text-xl font-medium">Log Attendance Complaint / Dispute</h2>
              <p className="text-xs text-[#746d68] mb-6">If you faced location geofence issues or system timeouts during a class, submit details below for administrative review.</p>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Submit New Complaint Form */}
                <form onSubmit={handleSubmitComplaint} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1">Select Course</label>
                    <select 
                      value={selectedCourse} 
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                    >
                      {courses.map((c) => (
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

                {/* Complaint History Table */}
                <div className="lg:col-span-2">
                  <h3 className="text-sm font-semibold text-[#650019] mb-3">Submitted Complaints History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#ece6dd] text-[#766c68]">
                          <th className="pb-3 font-semibold">Course</th>
                          <th className="pb-3 font-semibold">Issue Details</th>
                          <th className="pb-3 font-semibold">Date Submitted</th>
                          <th className="pb-3 text-right font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0ece5]">
                        {complaintsList.map((comp) => (
                          <tr key={comp.id}>
                            <td className="py-3.5 font-semibold text-[#650019]">{comp.course}</td>
                            <td className="py-3.5 text-[#514949] max-w-xs">{comp.issue}</td>
                            <td className="py-3.5 text-[#655d58]">{comp.date}</td>
                            <td className="py-3.5 text-right">
                              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                comp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
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