// src/app/lecturer/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const assignedCourses = [
  { id: 1, code: 'CSC 401', title: 'Software Engineering Principles', studentsEnrolled: 45 },
  { id: 2, code: 'CSC 403', title: 'Distributed Computing', studentsEnrolled: 38 },
];

export default function LecturerDashboard() {
  const router = useRouter();
  const lecturerName = 'Dr. Ojo Oluwapelumi';
  const lecturerEmail = 'lecturer@abuad.edu.ng';

  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [radiusMeters, setRadiusMeters] = useState(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartSession = (courseCode: string) => {
    setActiveCourse(courseCode);
    setSessionCode(Math.floor(100000 + Math.random() * 900000).toString());
  };

  const handleEndSession = () => {
    setActiveCourse(null);
    setSessionCode(null);
  };

  return (
    <main className="text-[#171717]">

      {/* =========================================================
          1. MOBILE TOP HEADER BAR (Visible only on small screens)
         ========================================================= */}
      <div className="flex lg:hidden items-center justify-between bg-[#570015] text-white px-5 py-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition focus:outline-none cursor-pointer"
            aria-label="Open Menu"
          >
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-sm font-bold tracking-wide">ABUAD Portal</p>
            <p className="text-[10px] text-white/70">Lecturer Navigation</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold">{lecturerName}</p>
        </div>
      </div>

      {/* =========================================================
          2. MOBILE SLIDE-OUT MENU MODAL (Drawer)
         ========================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-[260px] bg-[#570015] px-5 py-7 text-white flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-10 border-b border-white/15 pb-4">
              <div>
                <p className="text-lg font-bold tracking-wide">ABUAD</p>
                <p className="mt-0.5 text-xs text-white/65">Lecturer Portal</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <nav className="space-y-2 text-sm">
              <Link href="#overview" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Dashboard</Link>
              <Link href="#courses" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">My Courses</Link>
              <Link href="#sessions" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Attendance Sessions</Link>
            </nav>

            <button
              onClick={() => router.replace('/login/lecturer')}
              className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          3. DESKTOP FIXED SIDEBAR (Hidden on mobile, visible on lg+)
         ========================================================= */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
        <div className="mb-12 border-b border-white/15 pb-6">
          <p className="text-lg font-bold tracking-wide">ABUAD</p>
          <p className="mt-1 text-xs text-white/65">Lecturer Portal</p>
        </div>
        <nav className="space-y-2 text-sm">
          <Link href="#overview" className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Dashboard</Link>
          <Link href="#courses" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">My Courses</Link>
          <Link href="#sessions" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Attendance Sessions</Link>
        </nav>
        <button
          onClick={() => router.replace('/login/lecturer')}
          className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer"
        >
          Sign out
        </button>
      </aside>

      {/* =========================================================
          4. MAIN CONTENT AREA
         ========================================================= */}
      <div className="min-h-screen lg:ml-[205px]">

        {/* Top Header Bar (Desktop Only) */}
        <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Lecturer dashboard</p>
            <h1 className="mt-1 text-lg font-semibold">College of Medicine &amp; Health Sciences</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{lecturerName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{lecturerEmail}</p>
            </div>
            <button
              onClick={() => router.replace('/login/lecturer')}
              className="rounded-md border border-[#ead9d5] px-3 py-2 text-xs font-semibold text-[#650019] transition hover:bg-[#fbf4f2] cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Dashboard Body Container */}
        <div className="mx-auto max-w-[1440px] space-y-9 px-5 py-7 sm:px-8 lg:px-10">

          {/* Overview Banner */}
          <section id="overview" className="flex flex-col items-start justify-between gap-5 rounded-lg bg-[#590018] p-7 text-white shadow-sm sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c3ca]">Teaching overview</p>
              <h2 className="mt-3 text-2xl font-medium">Welcome, {lecturerName}</h2>
              <p className="mt-2 text-sm text-white/85">Manage your courses and launch live geofenced attendance sessions.</p>
            </div>
            <div className="min-w-36 rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-wider text-white/75">Assigned Courses</p>
              <p className="mt-1 text-3xl font-bold text-[#f2cf00]">{assignedCourses.length}</p>
            </div>
          </section>

          {/* Active Session Notification Card */}
          {activeCourse && (
            <section id="sessions" className="flex flex-col justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center shadow-sm">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">Live session · {activeCourse}</span>
                <h2 className="mt-4 text-3xl font-bold tracking-widest text-[#145b46]">CODE: {sessionCode}</h2>
                <p className="mt-2 text-sm text-[#43534c]">Geofence radius: <span className="font-semibold">{radiusMeters} meters</span>. Students can now check in.</p>
              </div>
              <button
                onClick={handleEndSession}
                className="rounded-md bg-[#650019] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#7b1730] cursor-pointer"
              >
                End attendance session
              </button>
            </section>
          )}

          {/* Assigned Courses Section */}
          <section id="courses" className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7773]">Academic record</p>
              <h2 className="mt-2 text-[27px] font-medium">My Assigned Courses</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {assignedCourses.map((course) => (
                <article key={course.id} className="flex flex-col justify-between gap-7 rounded-lg border border-[#ead9d5] bg-white p-6 shadow-[0_2px_6px_rgba(80,30,30,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="rounded-md bg-[#f7f2ec] px-3 py-1 text-xs font-bold text-[#650019]">{course.code}</span>
                      <h3 className="mt-4 text-lg font-semibold">{course.title}</h3>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-cyan-800">{course.studentsEnrolled} students</span>
                  </div>
                  <div className="space-y-4 border-t border-[#eee8df] pt-4">
                    <label className="flex items-center justify-between gap-3 text-sm text-[#746d68]">Geofence radius
                      <select
                        value={radiusMeters}
                        onChange={(e) => setRadiusMeters(Number(e.target.value))}
                        className="rounded-md border border-[#ddd4ca] bg-white px-3 py-2 text-sm text-[#292323] focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                      >
                        <option value={20}>20 meters (Strict)</option>
                        <option value={50}>50 meters (Standard)</option>
                        <option value={100}>100 meters (Wide)</option>
                      </select>
                    </label>
                    <button
                      onClick={() => handleStartSession(course.code)}
                      disabled={activeCourse !== null}
                      className="w-full rounded-md bg-[#650019] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#7b1730] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                      {activeCourse === course.code ? 'Session in progress' : 'Start attendance session'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}