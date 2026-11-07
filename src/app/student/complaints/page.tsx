// src/app/student/complaints/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentComplaintsPage() {
  const router = useRouter();
  const studentName = 'Afe Babalola Student';
  const matricNumber = '20/ENG02/001';

  // State
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [complaintsList, setComplaintsList] = useState<any[]>([]);
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch courses and complaints on load
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/student/complaints');
        if (res.ok) {
          const data = await res.json();
          setEnrolledCourses(data.enrolledCourses || []);
          if (data.enrolledCourses?.length > 0) {
            setSelectedCourseId(data.enrolledCourses[0].id);
          }
          setComplaintsList(data.complaintsList || []);
        }
      } catch (err) {
        console.error('Failed to load complaints data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle New Dispute Submission
  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/student/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourseId || null,
          title: 'Attendance Dispute',
          description: complaintText,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComplaintsList([data.complaint, ...complaintsList]);
        setComplaintText('');
        alert('Your attendance dispute has been logged successfully for Admin review!');
      } else {
        alert('Failed to submit dispute. Please try again.');
      }
    } catch (err) {
      console.error('Network error submitting dispute', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="text-[#171717]">

      {/* =========================================================
          1. DESKTOP FIXED SIDEBAR
         ========================================================= */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
        <div className="mb-12 border-b border-white/15 pb-6">
          <p className="text-lg font-bold tracking-wide">ABUAD</p>
          <p className="mt-1 text-xs text-white/65">Student Portal</p>
        </div>
        <nav className="space-y-2 text-sm">
          <Link href="/student/dashboard" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Dashboard</Link>
          <Link href="/student/courses" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">My Courses</Link>
          <Link href="/student/attendance" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Attendance History</Link>
          <Link href="/student/complaints" className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Complaints &amp; Disputes</Link>
          <Link href="/student/settings" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Settings</Link>
        </nav>
        <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
          Sign out
        </button>
      </aside>

      {/* =========================================================
          2. MAIN CONTENT AREA
         ========================================================= */}
      <div className="min-h-screen lg:ml-[205px]">

        {/* Top Header Bar */}
        <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
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

          {loading ? (
            <div className="text-center py-12 text-sm text-[#746d68]">Loading your support desk...</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 items-start">

              {/* Form Container */}
              <section className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[#650019] border-b border-[#ece6dd] pb-3">Submit Attendance Dispute</h3>

                <form onSubmit={handleSubmitComplaint} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Affected Course</label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                    >
                      {enrolledCourses.length === 0 ? (
                        <option value="">No enrolled courses available</option>
                      ) : (
                        enrolledCourses.map((c) => (
                          <option key={c.id} value={c.id}>{c.code} - {c.title}</option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Describe Issue Details</label>
                    <textarea
                      rows={4}
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      placeholder="e.g. System timed out while verifying device GPS location during lecture..."
                      required
                      className="w-full px-3 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#590018] hover:bg-[#70001f] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Dispute'}
                  </button>
                </form>
              </section>

              {/* Complaints History Table Container */}
              <section className="lg:col-span-2 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#ece6dd] pb-3 mb-4">
                  <h3 className="text-base font-semibold text-[#650019]">Submitted Disputes Log</h3>
                  <span className="text-xs text-[#746d68] font-medium">{complaintsList.length} Records</span>
                </div>

                <div className="w-full overflow-x-auto pb-2">
                  <table className="w-full min-w-[560px] text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#ece6dd] text-[#766c68]">
                        <th className="pb-3 font-semibold whitespace-nowrap">Course</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Issue Summary</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Date Logged</th>
                        <th className="pb-3 text-right font-semibold whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ece5]">
                      {complaintsList.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-xs text-[#746d68] italic">No attendance disputes logged yet.</td>
                        </tr>
                      ) : (
                        complaintsList.map((comp) => (
                          <tr key={comp.id} className="transition hover:bg-[#fbf9f0]/60">
                            <td className="py-3.5 font-semibold text-[#650019] whitespace-nowrap">{comp.course}</td>
                            <td className="py-3.5 text-[#514949] max-w-[200px] truncate">{comp.issue}</td>
                            <td className="py-3.5 text-[#655d58] whitespace-nowrap">{comp.date}</td>
                            <td className="py-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                  comp.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                  comp.status === 'Under Review' ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' :
                                    'bg-amber-50 text-amber-800 border border-amber-200'
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          )}

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

        </div>
      </div>
    </main>
  );
}