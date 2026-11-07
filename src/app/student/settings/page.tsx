// src/app/student/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentSettingsPage() {
  const router = useRouter();

  // Student Profile Data State
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    matricNumber: '',
    email: '',
    college: '',
    department: '',
  });

  const [newMatricNumber, setNewMatricNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [matricSubmitting, setMatricSubmitting] = useState(false);
  const [matricMessage, setMatricMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStatusMessage, setPasswordStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch settings on load
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/student/settings');
        if (res.ok) {
          const data = await res.json();
          setStudentProfile({
            name: data.fullName || 'Student',
            matricNumber: data.matricNumber || '',
            email: data.email || '',
            college: data.college || 'College of Medicine & Health Sciences',
            department: data.department || 'Medicine & Surgery',
          });
          setNewMatricNumber(data.matricNumber || '');
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Handle Matric Number Update
  const handleUpdateMatric = async (e: React.FormEvent) => {
    e.preventDefault();
    setMatricMessage(null);
    setMatricSubmitting(true);

    try {
      const res = await fetch('/api/student/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricNumber: newMatricNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        setStudentProfile(prev => ({ ...prev, matricNumber: data.matricNumber }));
        setMatricMessage({ type: 'success', text: 'Matriculation number successfully updated and linked!' });
      } else {
        setMatricMessage({ type: 'error', text: data.error || 'Failed to update matriculation number.' });
      }
    } catch (err) {
      console.error('Network error updating matric number', err);
      setMatricMessage({ type: 'error', text: 'A network error occurred. Please try again.' });
    } finally {
      setMatricSubmitting(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatusMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordStatusMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatusMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatusMessage({ type: 'error', text: 'New passwords do not match. Please recheck.' });
      return;
    }

    // Success Mockup Action
    setPasswordStatusMessage({ type: 'success', text: 'Password successfully updated! Your account security settings have been saved.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <main className="text-[#171717]">

      {/* =========================================================
          DESKTOP FIXED SIDEBAR
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
          <Link href="/student/complaints" className="block rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition">Complaints &amp; Disputes</Link>
          <Link href="/student/settings" className="block rounded-md bg-white/12 px-3 py-3 font-semibold">Settings</Link>
        </nav>
        <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
          Sign out
        </button>
      </aside>

      {/* =========================================================
          MAIN CONTENT AREA
         ========================================================= */}
      <div className="min-h-screen lg:ml-[205px]">

        {/* Top Header Bar */}
        <header className="hidden lg:flex min-h-[76px] items-center justify-between border-b border-[#e9e3d8] bg-white/90 backdrop-blur-md px-5 sm:px-8 lg:px-10 sticky top-0 z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Account &amp; Security</p>
            <h1 className="mt-1 text-lg font-semibold">Student Settings &amp; Matriculation Management</h1>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{studentProfile.name}</p>
            <p className="mt-0.5 text-xs text-[#746d68]">{studentProfile.matricNumber || 'Provisional ID'}</p>
          </div>
        </header>

        {/* Page Body */}
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-8">

          {loading ? (
            <div className="text-center py-16 text-sm text-[#746d68]">Loading your settings profile...</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">

              {/* Profile Details & Matriculation Update Card */}
              <section className="space-y-6">
                <div className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-5">
                  <div className="border-b border-[#ece6dd] pb-3">
                    <h2 className="text-base font-semibold text-[#650019]">Student Info</h2>
                    <p className="text-xs text-[#746d68] mt-1">Institutional academic identity details.</p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#514949]">
                    <div>
                      <p className="text-xs text-[#817874] uppercase tracking-wide">Full Name</p>
                      <p className="font-semibold text-[#171717] mt-0.5">{studentProfile.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#817874] uppercase tracking-wide">Email Address</p>
                      <p className="font-medium text-[#171717] mt-0.5">{studentProfile.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#817874] uppercase tracking-wide">College</p>
                      <p className="font-medium text-[#171717] mt-0.5">{studentProfile.college}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#817874] uppercase tracking-wide">Department</p>
                      <p className="font-medium text-[#171717] mt-0.5">{studentProfile.department}</p>
                    </div>
                  </div>
                </div>

                {/* Matriculation Update Card */}
                <div className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#650019]">Matriculation Portal</h3>
                    <p className="text-xs text-[#746d68] mt-1">Update your official matric number once assigned.</p>
                  </div>

                  {matricMessage && (
                    <div className={`p-3 rounded-md text-xs font-semibold ${
                      matricMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {matricMessage.text}
                    </div>
                  )}

                  <form onSubmit={handleUpdateMatric} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#514949] mb-1">Official Matric Number</label>
                      <input
                        type="text"
                        value={newMatricNumber}
                        onChange={(e) => setNewMatricNumber(e.target.value)}
                        placeholder="e.g. 24/MHS01/001"
                        required
                        className="w-full px-3 py-2 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs font-medium text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={matricSubmitting}
                      className="w-full py-2.5 bg-[#590018] hover:bg-[#70001f] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition cursor-pointer disabled:opacity-50"
                    >
                      {matricSubmitting ? 'Updating...' : 'Save Matric Number'}
                    </button>
                  </form>
                </div>
              </section>

              {/* Password Management Form Container */}
              <section className="lg:col-span-2 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-6">
                <div className="border-b border-[#ece6dd] pb-3">
                  <h2 className="text-base font-semibold text-[#650019]">Change Portal Password</h2>
                  <p className="text-xs text-[#746d68] mt-1">Update your password regularly to secure your attendance records.</p>
                </div>

                {passwordStatusMessage && (
                  <div className={`p-4 rounded-md text-xs font-semibold ${
                    passwordStatusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {passwordStatusMessage.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-5 max-w-lg">
                  {/* Current Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        required
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018] pr-16"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-2.5 text-xs text-[#650019] font-medium cursor-pointer"
                      >
                        {showCurrent ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters long"
                        required
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018] pr-16"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-2.5 text-xs text-[#650019] font-medium cursor-pointer"
                      >
                        {showNew ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#514949] mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        required
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#ead9d5] bg-[#fbf9f0] text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#590018] pr-16"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-2.5 text-xs text-[#650019] font-medium cursor-pointer"
                      >
                        {showConfirm ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#590018] hover:bg-[#70001f] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </section>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}