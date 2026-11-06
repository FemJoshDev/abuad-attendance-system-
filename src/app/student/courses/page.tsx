'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Master departmental catalog uploaded by Admin
const initialMasterCatalog = [
  { id: 1, code: 'MBBS 501', title: 'Anatomy V', semester: 'First Semester', lecturer: 'Dr. Ojo Oluwapelumi', units: 4, status: 'Enrolled', present: 18, total: 20 },
  { id: 2, code: 'MBBS 503', title: 'Physiology V', semester: 'First Semester', lecturer: 'Prof. Adebayo Johnson', units: 4, status: 'Enrolled', present: 15, total: 20 },
  { id: 3, code: 'MBBS 505', title: 'Biochemistry V', semester: 'First Semester', lecturer: 'Dr. Emeka Obi', units: 3, status: 'Enrolled', present: 13, total: 21 },
  { id: 4, code: 'MBBS 502', title: 'Pathology & Pharmacology', semester: 'Second Semester', lecturer: 'Dr. Sarah Jenkins', units: 4, status: 'Available', present: 0, total: 0 },
  { id: 5, code: 'MBBS 504', title: 'Community Medicine', semester: 'Second Semester', lecturer: 'Prof. Ahmed Bello', units: 3, status: 'Available', present: 0, total: 0 },
  { id: 6, code: 'MBBS 507', title: 'Clinical Pharmacology Elective', semester: 'First Semester', lecturer: 'Dr. Tunde Fowler', units: 2, status: 'Available', present: 0, total: 0 },
];

export default function StudentCoursesPage() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('First Semester');
  const [activeTab, setActiveTab] = useState<'enrolled' | 'catalog'>('enrolled');
  const [coursesList, setCoursesList] = useState(initialMasterCatalog);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<typeof initialMasterCatalog[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- State for mobile modal drawer

  // Toggle enrollment status (Select / Drop course)
  const handleToggleEnrollment = (courseId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Enrolled' ? 'Available' : 'Enrolled';
    setCoursesList(prev => prev.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
    alert(newStatus === 'Enrolled' ? 'Successfully registered for course!' : 'Course dropped from your schedule.');
  };

  // Filter courses based on tab, semester, and search query
  const filteredCourses = coursesList.filter((course) => {
    const matchesTab = activeTab === 'enrolled' ? course.status === 'Enrolled' : true;
    const matchesSemester = course.semester === selectedSemester;
    const matchesSearch = course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSemester && matchesSearch;
  });

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
              <p className="text-[10px] text-white/70">Student Navigation</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold">{studentName}</p>
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
                  <p className="mt-0.5 text-xs text-white/65">Student Portal</p>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <nav className="space-y-2 text-sm">
                <button 
                  onClick={() => { router.push('/student/dashboard'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { router.push('/student/courses'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer"
                >
                  My Courses
                </button>
                <button 
                  onClick={() => { router.push('/student/attendance'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
                >
                  Attendance History
                </button>
                <button 
                  onClick={() => { router.push('/student/complaints'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
                >
                  Complaints &amp; Disputes
                </button>
                <button 
                  onClick={() => { router.push('/student/settings'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
                >
                  Settings
                </button>
              </nav>

              <button 
                onClick={() => router.push('/login')} 
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
            <p className="mt-1 text-xs text-white/65">Student Portal</p>
          </div>
          <nav className="space-y-2 text-sm">
            <button
              onClick={() => router.push('/student/dashboard#overview')}
              className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/student/courses')}
              className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer"
            >
              My Courses
            </button>
            <button
              onClick={() => router.push('/student/attendance')}
              className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
            >
              Attendance History
            </button>
            <button
              onClick={() => router.push('/student/complaints')}
              className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
            >
              Complaints &amp; Disputes
            </button>
            <button
              onClick={() => router.push('/student/settings')}
              className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer"
            >
              Settings
            </button>
          </nav>
          <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
            Sign out
          </button>
        </aside>

        {/* =========================================================
            4. MAIN CONTENT AREA
           ========================================================= */}
        <div className="min-h-screen lg:ml-[205px]">
          
          {/* Top Header Bar */}
          <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Course Registration &amp; Selection</p>
              <h1 className="mt-1 text-lg font-semibold">Manage Enrolled &amp; Catalog Courses</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{matricNumber}</p>
            </div>
          </header>

          {/* Page Body */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-8">
            
            {/* View Mode Tabs (Enrolled vs Catalog) & Semester Switcher */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white/95 backdrop-blur-sm p-5 rounded-lg border border-[#ead9d5] shadow-sm">
              <div className="flex rounded-md bg-[#eeece4] p-1 text-sm">
                <button 
                  onClick={() => setActiveTab('enrolled')}
                  className={`rounded px-4 py-2 font-semibold transition cursor-pointer ${activeTab === 'enrolled' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a] hover:bg-black/5'}`}
                >
                  My Enrolled Courses ({coursesList.filter(c => c.status === 'Enrolled').length})
                </button>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className={`rounded px-4 py-2 font-semibold transition cursor-pointer ${activeTab === 'catalog' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a] hover:bg-black/5'}`}
                >
                  Browse Master Catalog
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                />
                <div className="flex rounded-md bg-[#eeece4] p-1 text-sm">
                  <button 
                    onClick={() => setSelectedSemester('First Semester')}
                    className={`rounded px-3 py-2 font-semibold transition cursor-pointer ${selectedSemester === 'First Semester' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a]'}`}
                  >
                    1st Sem
                  </button>
                  <button 
                    onClick={() => setSelectedSemester('Second Semester')}
                    className={`rounded px-3 py-2 font-semibold transition cursor-pointer ${selectedSemester === 'Second Semester' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a]'}`}
                  >
                    2nd Sem
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => {
                const percentage = course.total > 0 ? Math.round((course.present / course.total) * 100) : 0;
                return (
                  <article key={course.code} className="flex flex-col justify-between rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm transition hover:shadow-md">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-md bg-[#f7f2ec] px-3 py-1 text-xs font-bold text-[#650019]">{course.code}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${course.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-stone-100 text-stone-700 border border-stone-200'}`}>
                          {course.status}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[#171717]">{course.title}</h3>
                      <p className="mt-1 text-xs text-[#746d68]">Lecturer: <span className="font-medium text-[#514949]">{course.lecturer}</span></p>
                      <p className="mt-0.5 text-xs text-[#746d68]">Units: <span className="font-medium text-[#514949]">{course.units} Credit Units</span></p>
                    </div>

                    <div className="mt-6 border-t border-[#eee8df] pt-4 space-y-3">
                      {course.status === 'Enrolled' ? (
                        <>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#746d68]">Attendance Standing</span>
                            <span className="font-bold text-cyan-800">{percentage}%</span>
                          </div>
                          <div className="h-[6px] overflow-hidden rounded-full bg-[#e9e7df]">
                            <div className="h-full rounded-full bg-cyan-800" style={{ width: `${percentage}%` }} />
                          </div>
                          <button 
                            onClick={() => alert(`Opening GPS geofence check-in scanner for ${course.code}...`)}
                            className="w-full rounded-md bg-emerald-700 hover:bg-emerald-800 py-2 text-xs font-bold uppercase tracking-wider text-white transition shadow-sm cursor-pointer animate-pulse"
                          >
                            🔴 Check In Live Session
                          </button>
                        </>
                      ) : (
                        <p className="text-xs text-[#817874] italic">Available from department catalog.</p>
                      )}
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleToggleEnrollment(course.id, course.status)}
                          className={`flex-1 rounded-md py-2 text-xs font-bold uppercase tracking-wider text-white transition cursor-pointer ${
                            course.status === 'Enrolled' ? 'bg-rose-800 hover:bg-rose-900' : 'bg-[#650019] hover:bg-[#7b1730]'
                          }`}
                        >
                          {course.status === 'Enrolled' ? 'Drop Course' : 'Register Course'}
                        </button>
                        <button 
                          onClick={() => setSelectedCourseDetail(course)}
                          className="rounded-md border border-[#ead9d5] px-3 py-2 text-xs font-semibold text-[#650019] hover:bg-[#fbf4f2] transition cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Modal for Course Details */}
            {selectedCourseDetail && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-[#ead9d5] space-y-4">
                  <div className="flex items-start justify-between border-b border-[#ece6dd] pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-[#650019]">{selectedCourseDetail.code}</span>
                      <h3 className="text-xl font-semibold text-[#171717]">{selectedCourseDetail.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedCourseDetail(null)}
                      className="text-stone-400 hover:text-stone-700 font-bold text-lg cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-[#514949]">
                    <p><strong>Assigned Lecturer:</strong> {selectedCourseDetail.lecturer}</p>
                    <p><strong>Semester:</strong> {selectedCourseDetail.semester}</p>
                    <p><strong>Credit Units:</strong> {selectedCourseDetail.units}</p>
                    <p><strong>Registration Status:</strong> {selectedCourseDetail.status}</p>
                    {selectedCourseDetail.status === 'Enrolled' && (
                      <p><strong>Classes Attended:</strong> {selectedCourseDetail.present} out of {selectedCourseDetail.total} sessions recorded.</p>
                    )}
                  </div>
                  <div className="pt-4 border-t border-[#ece6dd] flex items-center justify-between">
                    <button 
                      onClick={() => {
                        handleToggleEnrollment(selectedCourseDetail.id, selectedCourseDetail.status);
                        setSelectedCourseDetail(null);
                      }}
                      className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-white transition cursor-pointer ${
                        selectedCourseDetail.status === 'Enrolled' ? 'bg-rose-800 hover:bg-rose-900' : 'bg-[#650019] hover:bg-[#7b1730]'
                      }`}
                    >
                      {selectedCourseDetail.status === 'Enrolled' ? 'Drop Course' : 'Register Course'}
                    </button>
                    <button 
                      onClick={() => setSelectedCourseDetail(null)}
                      className="px-4 py-2 border border-[#ead9d5] text-[#650019] rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#fbf4f2] cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

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