'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Sample list of courses for complaint submission dropdown
const enrolledCourses = [
  { code: 'MBBS 501', title: 'Anatomy V' },
  { code: 'MBBS 503', title: 'Physiology V' },
  { code: 'MBBS 505', title: 'Biochemistry V' },
];

// Historical student complaints list
const initialComplaints = [
  { id: 1, course: 'MBBS 505', issue: 'Marked absent due to poor network geofence timeout in Biochemistry lecture.', date: 'Oct 22, 2026', status: 'Pending', resolutionNote: 'Awaiting Dean review.' },
  { id: 2, course: 'MBBS 503', issue: 'Device location error during Physiology check-in session.', date: 'Oct 18, 2026', status: 'Resolved', resolutionNote: 'Attendance record updated to Present after lecturer verification.' },
];

export default function StudentComplaintsPage() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  // Form State
  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0].code);
  const [complaintText, setComplaintText] = useState('');
  const [complaintsList, setComplaintsList] = useState(initialComplaints);
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState<typeof initialComplaints[0] | null>(null);

  // Handle New Dispute Submission
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;

    const newComplaint = {
      id: complaintsList.length + 1,
      course: selectedCourse,
      issue: complaintText,
      date: 'Oct 29, 2026',
      status: 'Pending',
      resolutionNote: 'Submitted to Admin desk for verification.',
    };

    setComplaintsList([newComplaint, ...complaintsList]);
    setComplaintText('');
    alert('Your attendance dispute has been logged successfully for Admin review!');
  };

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
            <button onClick={() => router.push('/student/courses')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">My Courses</button>
            <button onClick={() => router.push('/student/attendance')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Attendance History</button>
            <button onClick={() => router.push('/student/complaints')} className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer">Complaints &amp; Disputes</button>
            <button onClick={() => router.push('/student/settings')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Settings</button>
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Support Desk</p>
              <h1 className="mt-1 text-lg font-semibold">Attendance Disputes &amp; Appeals</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentName}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{matricNumber}</p>
            </div>
          </header>

          {/* Page Body */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-8">
            
            {/* Overview Header Banner */}
            <section className="rounded-lg bg-[#590018] p-6 text-white shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0c3ca]">Support Overview</p>
              <h2 className="mt-2 text-2xl font-medium">Log Attendance Issue</h2>
              <p className="mt-2 text-sm text-white/85 max-w-2xl">
                If you were marked absent due to location geofence mismatches, device GPS latency, or network issues during an active lecture session, log your dispute below for review.
              </p>
            </section>

            {/* Content Layout: New Dispute Form & Complaints Log */}
            <div className="grid gap-8 lg:grid-cols-3">
              
              {/* Form Container */}
              <section className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[#650019] border-b border-[#ece6dd] pb-3">Submit Attendance Dispute</h3>
                
                <form onSubmit={handleSubmitComplaint} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Affected Course</label>
                    <select 
                      value={selectedCourse} 
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                    >
                      {enrolledCourses.map((c) => (
                        <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Describe Issue Details</label>
                    <textarea 
                      rows={4}
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      placeholder="e.g. System timed out while verifying device GPS location during Anatomy lecture on Oct 26..."
                      required
                      className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#590018] hover:bg-[#70001f] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition cursor-pointer"
                  >
                    Submit Dispute
                  </button>
                </form>
              </section>

              {/* Complaints History Table Container */}
              <section className="lg:col-span-2 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#ece6dd] pb-3 mb-4">
                  <h3 className="text-base font-semibold text-[#650019]">Submitted Disputes Log</h3>
                  <span className="text-xs text-[#746d68] font-medium">{complaintsList.length} Records</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#ece6dd] text-[#766c68]">
                        <th className="pb-3 font-semibold">Course</th>
                        <th className="pb-3 font-semibold">Issue Summary</th>
                        <th className="pb-3 font-semibold">Date Logged</th>
                        <th className="pb-3 text-right font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ece5]">
                      {complaintsList.map((comp) => (
                        <tr key={comp.id} className="transition hover:bg-[#fbf9f0]/60">
                          <td className="py-3.5 font-semibold text-[#650019]">{comp.course}</td>
                          <td className="py-3.5 text-[#514949] max-w-xs truncate">{comp.issue}</td>
                          <td className="py-3.5 text-[#655d58]">{comp.date}</td>
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                comp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {comp.status}
                              </span>
                              <button 
                                onClick={() => setSelectedComplaintDetail(comp)}
                                className="text-xs font-semibold text-[#650019] hover:underline cursor-pointer"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* Complaint Detail Modal */}
            {selectedComplaintDetail && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl border border-[#ead9d5] space-y-4">
                  <div className="flex items-start justify-between border-b border-[#ece6dd] pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-[#650019]">{selectedComplaintDetail.course}</span>
                      <h3 className="text-lg font-semibold text-[#171717]">Dispute Details</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedComplaintDetail(null)}
                      className="text-stone-400 hover:text-stone-700 font-bold text-lg cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#514949]">
                    <p><strong>Date Submitted:</strong> {selectedComplaintDetail.date}</p>
                    <p><strong>Current Status:</strong> <span className="font-semibold text-[#650019]">{selectedComplaintDetail.status}</span></p>
                    <div>
                      <strong>Submitted Issue:</strong>
                      <p className="mt-1 rounded-md bg-[#fbf9f0] p-3 text-xs text-[#171717] border border-[#ead9d5]">
                        {selectedComplaintDetail.issue}
                      </p>
                    </div>
                    <div>
                      <strong>Admin Resolution Note:</strong>
                      <p className="mt-1 text-xs text-[#746d68] italic">
                        {selectedComplaintDetail.resolutionNote}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#ece6dd] flex justify-end">
                    <button 
                      onClick={() => setSelectedComplaintDetail(null)}
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
