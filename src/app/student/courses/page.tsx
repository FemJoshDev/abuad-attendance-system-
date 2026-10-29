'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Full catalog of uploaded institutional courses
const allAvailableCourses = [
  { id: 1, code: 'MBBS 501', title: 'Anatomy V', semester: 'First Semester', lecturer: 'Dr. Ojo Oluwapelumi', units: 4, status: 'Enrolled', present: 18, total: 20 },
  { id: 2, code: 'MBBS 503', title: 'Physiology V', semester: 'First Semester', lecturer: 'Prof. Adebayo Johnson', units: 4, status: 'Enrolled', present: 15, total: 20 },
  { id: 3, code: 'MBBS 505', title: 'Biochemistry V', semester: 'First Semester', lecturer: 'Dr. Emeka Obi', units: 3, status: 'Enrolled', present: 13, total: 21 },
  { id: 4, code: 'MBBS 502', title: 'Pathology & Pharmacology', semester: 'Second Semester', lecturer: 'Dr. Sarah Jenkins', units: 4, status: 'Available', present: 0, total: 0 },
  { id: 5, code: 'MBBS 504', title: 'Community Medicine', semester: 'Second Semester', lecturer: 'Prof. Ahmed Bello', units: 3, status: 'Available', present: 0, total: 0 },
];

export default function StudentCoursesPage() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('First Semester');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<typeof allAvailableCourses[0] | null>(null);

  // Filter courses based on semester and search query
  const filteredCourses = allAvailableCourses.filter((course) => {
    const matchesSemester = course.semester === selectedSemester;
    const matchesSearch = course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
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
        {/* Fixed Burgundy Sidebar Navigation */}
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
          <div className="mb-12 border-b border-white/15 pb-6">
            <p className="text-lg font-bold tracking-wide">ABUAD</p>
            <p className="mt-1 text-xs text-white/65">Student Portal</p>
          </div>
          <nav className="space-y-2 text-sm">
            <button onClick={() => router.push('/student/dashboard')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Dashboard</button>
            <button onClick={() => router.push('/student/courses')} className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer">My Courses</button>
            <button onClick={() => router.push('/student/dashboard#attendance')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Attendance History</button>
            <button onClick={() => router.push('/student/dashboard#complaints')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Complaints & Disputes</button>
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Course Catalog</p>
              <h1 className="mt-1 text-lg font-semibold">Registered &amp; Departmental Courses</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{matricNumber}</p>
            </div>
          </header>

          {/* Page Body */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-8">
            
            {/* Search and Semester Filter Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/95 backdrop-blur-sm p-5 rounded-lg border border-[#ead9d5] shadow-sm">
              <div className="flex-1">
                <input 
                  type="text"
                  placeholder="Search by course code or title (e.g., MBBS 501)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                />
              </div>
              <div className="flex rounded-md bg-[#eeece4] p-1 text-sm self-start md:self-auto">
                <button 
                  onClick={() => setSelectedSemester('First Semester')}
                  className={`rounded px-4 py-2 font-semibold transition cursor-pointer ${selectedSemester === 'First Semester' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a] hover:bg-black/5'}`}
                >
                  First Semester
                </button>
                <button 
                  onClick={() => setSelectedSemester('Second Semester')}
                  className={`rounded px-4 py-2 font-semibold transition cursor-pointer ${selectedSemester === 'Second Semester' ? 'bg-[#590018] text-white shadow-sm' : 'text-[#57494a] hover:bg-black/5'}`}
                >
                  Second Semester
                </button>
              </div>
            </div>

            {/* Courses Catalog Grid */}
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
                        </>
                      ) : (
                        <p className="text-xs text-[#817874] italic">Departmental course pool entry.</p>
                      )}
                      
                      <button 
                        onClick={() => setSelectedCourseDetail(course)}
                        className="w-full mt-2 rounded-md bg-[#590018] hover:bg-[#70001f] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition cursor-pointer"
                      >
                        View Course Details
                      </button>
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
                  <div className="pt-4 border-t border-[#ece6dd] flex justify-end">
                    <button 
                      onClick={() => setSelectedCourseDetail(null)}
                      className="px-4 py-2 bg-[#590018] text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#70001f] cursor-pointer"
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