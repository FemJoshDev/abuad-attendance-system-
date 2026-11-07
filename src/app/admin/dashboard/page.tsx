// src/app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type StaffUser = { id: number; name: string; email: string; role: string; identifier: string };
type ClosedSession = { id: number; courseCode: string; courseTitle: string; lecturerName: string; date: string; totalPresent: number };
type Complaint = { id: number; studentName: string; matricNumber: string; course: string; issue: string; status: string };

const stats = { totalUsers: 540, totalStudents: 495, totalLecturers: 42, activeCourses: 28 };

export default function AdminDashboard() {
  const router = useRouter();
  const adminName = 'ABUAD System Admin';
  const adminEmail = 'admin@abuad.edu.ng';

  const [users, setUsers] = useState<StaffUser[]>([
    { id: 1, name: 'Dr. Ojo Oluwapelumi', email: 'lecturer@abuad.edu.ng', role: 'LECTURER', identifier: 'Staff ID: ABUAD/LEC/001' },
    { id: 2, name: 'Prof. Adebayo Johnson', email: 'adebayo@abuad.edu.ng', role: 'LECTURER', identifier: 'Staff ID: ABUAD/LEC/002' },
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newUserRole, setNewUserRole] = useState('LECTURER');
  const [newUserIdentifier, setNewUserIdentifier] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [closedSessions] = useState<ClosedSession[]>([
    { id: 1, courseCode: 'CSC 401', courseTitle: 'Software Engineering Principles', lecturerName: 'Dr. Ojo Oluwapelumi', date: 'Oct 26, 2026', totalPresent: 42 },
    { id: 2, courseCode: 'CSC 403', courseTitle: 'Distributed Computing', lecturerName: 'Prof. Adebayo Johnson', date: 'Oct 25, 2026', totalPresent: 35 },
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, studentName: 'Afe Babalola Student', matricNumber: '20/ENG02/001', course: 'CSC 401', issue: 'Marked absent due to poor network geofence timeout.', status: 'Pending' },
    { id: 2, studentName: 'Oluwaseun Ade', matricNumber: '21/SCI01/045', course: 'CSC 403', issue: 'Device location error during check-in session.', status: 'Resolved' },
  ]);

  const handleCreateUser = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) return;
    const createdName = newUserName;
    setUsers((current) => [{
      id: current.length + 1,
      name: createdName,
      email: newUserEmail,
      role: newUserRole,
      identifier: newUserIdentifier || 'Staff ID: Pending',
    }, ...current]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    setShowPassword(false);
    setNewUserIdentifier('');
    alert(`Successfully provisioned new ${newUserRole} staff account for ${createdName}!`);
  };

  const handleResolveComplaint = (id: number) => {
    setComplaints((current) => current.map((complaint) => complaint.id === id ? { ...complaint, status: 'Resolved' } : complaint));
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
            <p className="text-[10px] text-white/70">Admin Navigation</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold">{adminName}</p>
        </div>
      </div>

      {/* =========================================================
          2. MOBILE SLIDE-OUT MENU MODAL (Drawer)
         ========================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-[260px] bg-[#570015] px-5 py-7 text-white flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-10 border-b border-white/15 pb-4">
              <div>
                <p className="text-lg font-bold tracking-wide">ABUAD</p>
                <p className="mt-0.5 text-xs text-white/65">Admin Portal</p>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <nav className="space-y-2 text-sm">
              <a href="#overview" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Dashboard</a>
              <a href="#staff" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Staff Accounts</a>
              <a href="#reports" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Attendance Reports</a>
              <a href="#complaints" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Student Complaints</a>
            </nav>

            <button 
              onClick={() => router.replace('/login/admin')} 
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
          <p className="mt-1 text-xs text-white/65">Admin Portal</p>
        </div>
        <nav className="space-y-2 text-sm">
          <a href="#overview" className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Dashboard</a>
          <a href="#staff" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Staff Accounts</a>
          <a href="#reports" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Attendance Reports</a>
          <a href="#complaints" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Student Complaints</a>
        </nav>
        <button 
          onClick={() => router.replace('/login/admin')} 
          className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer"
        >
          Sign out
        </button>
      </aside>

      {/* =========================================================
          4. MAIN CONTENT AREA
         ========================================================= */}
      <div className="min-h-screen lg:ml-[205px]">
        <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Admin dashboard</p>
            <h1 className="mt-1 text-lg font-semibold">College of Medicine &amp; Health Sciences</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{adminName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{adminEmail}</p>
            </div>
            <button 
              onClick={() => router.replace('/login/admin')} 
              className="rounded-md border border-[#ead9d5] px-3 py-2 text-xs font-semibold text-[#650019] transition hover:bg-[#fbf4f2] cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] space-y-8 px-5 py-7 sm:px-8 lg:px-10">
          
          {/* Overview Banner */}
          <section id="overview" className="flex flex-col items-start justify-between gap-4 rounded-lg bg-[#590018] p-7 text-white shadow-sm md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c3ca]">System overview</p>
              <h2 className="mt-3 text-2xl font-medium">Administration Panel</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/85">Provision staff accounts with login passwords, export closed attendance logs, and resolve student complaints.</p>
            </div>
            <div className="min-w-44 rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-wider text-white/75">Total Registered Users</p>
              <p className="mt-1 text-3xl font-bold text-[#f2cf00]">{stats.totalUsers}</p>
            </div>
          </section>

          {/* Quick Metrics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total Students', value: stats.totalStudents, color: 'text-[#650019]' },
              { label: 'Total Lecturers', value: stats.totalLecturers, color: 'text-cyan-800' },
              { label: 'Active Courses', value: stats.activeCourses, color: 'text-[#9a7900]' },
              { label: 'System Status', value: 'Operational', color: 'text-emerald-800' },
            ].map((stat) => (
              <article key={stat.label} className="rounded-lg border border-[#ead9d5] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-[#9a7773]">{stat.label}</p>
                <p className={`mt-2 text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
              </article>
            ))}
          </section>

          {/* Provision Staff & Reports Grid */}
          <div className="grid gap-6 lg:grid-cols-3 items-start">
            
            {/* Staff Account Provisioning Form */}
            <section id="staff" className="rounded-lg border border-[#ead9d5] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#650019]">Provision Staff Account</h2>
              <p className="mb-5 mt-2 text-xs leading-5 text-[#746d68]">Students register through the student portal. Use this form to assign credentials for lecturers and admins.</p>
              
              <form onSubmit={handleCreateUser} className="space-y-4">
                <label className="block text-xs font-medium text-[#514949]">Full Name
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Jane Doe" 
                    value={newUserName} 
                    onChange={(event) => setNewUserName(event.target.value)} 
                    required 
                    className="mt-1.5 w-full rounded-md border border-[#ddd4ca] bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]" 
                  />
                </label>

                <label className="block text-xs font-medium text-[#514949]">Institutional Email
                  <input 
                    type="email" 
                    placeholder="e.g. janedoe@abuad.edu.ng" 
                    value={newUserEmail} 
                    onChange={(event) => setNewUserEmail(event.target.value)} 
                    required 
                    className="mt-1.5 w-full rounded-md border border-[#ddd4ca] bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]" 
                  />
                </label>

                <label className="block text-xs font-medium text-[#514949]">Password
                  <div className="relative mt-1.5">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={newUserPassword} 
                      onChange={(event) => setNewUserPassword(event.target.value)} 
                      required 
                      className="w-full rounded-md border border-[#ddd4ca] bg-white px-3 py-2.5 pr-14 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3.5 flex items-center text-xs font-semibold text-[#650019] hover:text-[#8B1E3F] cursor-pointer"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>

                <label className="block text-xs font-medium text-[#514949]">Staff Role
                  <select 
                    value={newUserRole} 
                    onChange={(event) => setNewUserRole(event.target.value)} 
                    className="mt-1.5 w-full rounded-md border border-[#ddd4ca] bg-white px-3 py-2.5 text-sm text-[#292323] focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                  >
                    <option value="LECTURER">LECTURER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </label>

                <label className="block text-xs font-medium text-[#514949]">Staff ID Number
                  <input 
                    type="text" 
                    placeholder="e.g. ABUAD/LEC/003" 
                    value={newUserIdentifier} 
                    onChange={(event) => setNewUserIdentifier(event.target.value)} 
                    className="mt-1.5 w-full rounded-md border border-[#ddd4ca] bg-white px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]" 
                  />
                </label>

                <button 
                  type="submit" 
                  className="w-full cursor-pointer rounded-md bg-[#650019] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#7b1730]"
                >
                  Provision Staff
                </button>
              </form>

              {users.length > 0 && (
                <div className="mt-6 border-t border-[#eee8df] pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#9a7773]">Provisioned in this session</p>
                  <ul className="space-y-2">
                    {users.map((user) => (
                      <li key={user.id} className="text-xs">
                        <span className="font-semibold text-[#650019]">{user.name}</span>
                        <span className="block text-[#817874]">{user.email} · {user.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Closed Attendance Reports Table */}
            <section id="reports" className="rounded-lg border border-[#ead9d5] bg-white p-6 shadow-sm lg:col-span-2 overflow-hidden">
              <h2 className="text-lg font-semibold text-[#650019]">Closed Attendance Reports</h2>
              <p className="mb-5 mt-2 text-xs text-[#746d68]">Download attendance sheets by lecturer and course.</p>
              
              <div className="w-full overflow-x-auto pb-2">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ece6dd] text-[#766c68]">
                      <th className="pb-3 font-semibold whitespace-nowrap">Course &amp; Lecturer</th>
                      <th className="pb-3 font-semibold whitespace-nowrap">Date</th>
                      <th className="pb-3 font-semibold whitespace-nowrap">Present</th>
                      <th className="pb-3 text-right font-semibold whitespace-nowrap">Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ece5]">
                    {closedSessions.map((session) => (
                      <tr key={session.id} className="transition hover:bg-[#fbf9f0]">
                        <td className="py-4 whitespace-nowrap">
                          <p className="font-semibold text-[#650019]">{session.courseCode} - {session.courseTitle}</p>
                          <p className="mt-1 text-xs text-[#817874]">Lecturer: {session.lecturerName}</p>
                        </td>
                        <td className="py-4 text-[#655d58] whitespace-nowrap">{session.date}</td>
                        <td className="py-4 font-semibold text-cyan-800 whitespace-nowrap">{session.totalPresent} students</td>
                        <td className="py-4 text-right whitespace-nowrap">
                          <button 
                            onClick={() => alert(`Downloading attendance CSV report for ${session.courseCode} (${session.lecturerName}) ...`)} 
                            className="cursor-pointer rounded-md bg-cyan-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-900"
                          >
                            Download CSV
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Student Complaints Table */}
          <section id="complaints" className="rounded-lg border border-[#ead9d5] bg-white p-6 shadow-sm overflow-hidden">
            <h2 className="text-lg font-semibold text-[#650019]">Student Attendance Complaints</h2>
            <p className="mb-5 mt-2 text-xs text-[#746d68]">Review and resolve attendance issues submitted by students.</p>
            
            <div className="w-full overflow-x-auto pb-2">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#ece6dd] text-[#766c68]">
                    <th className="pb-3 font-semibold whitespace-nowrap">Student &amp; Matric</th>
                    <th className="pb-3 font-semibold whitespace-nowrap">Course</th>
                    <th className="pb-3 font-semibold whitespace-nowrap">Complaint</th>
                    <th className="pb-3 font-semibold whitespace-nowrap">Status</th>
                    <th className="pb-3 text-right font-semibold whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece5]">
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="transition hover:bg-[#fbf9f0]">
                      <td className="py-4 whitespace-nowrap">
                        <p className="font-semibold">{complaint.studentName}</p>
                        <p className="mt-1 text-xs text-[#817874]">{complaint.matricNumber}</p>
                      </td>
                      <td className="py-4 font-semibold text-[#650019] whitespace-nowrap">{complaint.course}</td>
                      <td className="py-4 text-[#655d58] max-w-xs">{complaint.issue}</td>
                      <td className="py-4 whitespace-nowrap">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="py-4 text-right whitespace-nowrap">
                        {complaint.status === 'Pending' ? (
                          <button 
                            onClick={() => handleResolveComplaint(complaint.id)} 
                            className="cursor-pointer rounded-md bg-[#650019] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#7b1730]"
                          >
                            Resolve
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-[#817874]">Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}