'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StudentSettingsPage() {
  const router = useRouter();

  // Student Profile Data
  const studentProfile = {
    name: 'Afe Babalola Student',
    matricNumber: '20/ENG02/001',
    email: 'student@abuad.edu.ng',
    college: 'College of Medicine & Health Sciences',
    department: 'Medicine & Surgery (500 Level)',
  };

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Status Messages
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }

    if (newPassword.length < 8) {
      setStatusMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match. Please recheck.' });
      return;
    }

    // Success Mockup Action
    setStatusMessage({ type: 'success', text: 'Password successfully updated! Your account security settings have been saved.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
            <p className="text-xs font-semibold">{studentProfile.name}</p>
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
                <button onClick={() => { router.push('/student/dashboard'); setIsMobileMenuOpen(false); }} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Dashboard</button>
                <button onClick={() => { router.push('/student/courses'); setIsMobileMenuOpen(false); }} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">My Courses</button>
                <button onClick={() => { router.push('/student/attendance'); setIsMobileMenuOpen(false); }} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Attendance History</button>
                <button onClick={() => { router.push('/student/complaints'); setIsMobileMenuOpen(false); }} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Complaints &amp; Disputes</button>
                <button onClick={() => { router.push('/student/settings'); setIsMobileMenuOpen(false); }} className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer">Settings</button>
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
            <button onClick={() => router.push('/student/dashboard')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Dashboard</button>
            <button onClick={() => router.push('/student/courses')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">My Courses</button>
            <button onClick={() => router.push('/student/attendance')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Attendance History</button>
            <button onClick={() => router.push('/student/complaints')} className="w-full text-left rounded-md px-3 py-3 text-white/75 hover:bg-white/10 transition cursor-pointer">Complaints &amp; Disputes</button>
            <button onClick={() => router.push('/student/settings')} className="w-full text-left rounded-md bg-white/12 px-3 py-3 font-semibold cursor-pointer">Settings</button>
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b67]">Account Security</p>
              <h1 className="mt-1 text-lg font-semibold">Student Settings &amp; Password Management</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{studentProfile.name}</p>
              <p className="mt-0.5 text-xs text-[#746d68]">{studentProfile.matricNumber}</p>
            </div>
          </header>

          {/* Page Body */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 space-y-8">

            <div className="grid gap-8 lg:grid-cols-3">

              {/* Profile Details Card */}
              <section className="rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-5">
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
                    <p className="text-xs text-[#817874] uppercase tracking-wide">Matric Number</p>
                    <p className="font-semibold text-[#650019] mt-0.5">{studentProfile.matricNumber}</p>
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

                <div className="rounded-md bg-[#f7f2ec] p-3 text-xs text-[#746d68] border border-[#ead9d5]">
                  <p>Profile updates are managed directly by the Dean&apos;s Office or College Administrator.</p>
                </div>
              </section>

              {/* Password Management Form Container */}
              <section className="lg:col-span-2 rounded-lg border border-[#ead9d5] bg-white/95 backdrop-blur-sm p-6 shadow-sm space-y-6">
                <div className="border-b border-[#ece6dd] pb-3">
                  <h2 className="text-base font-semibold text-[#650019]">Change Portal Password</h2>
                  <p className="text-xs text-[#746d68] mt-1">Update your password regularly to secure your attendance records.</p>
                </div>

                {statusMessage && (
                  <div className={`p-4 rounded-md text-xs font-semibold ${
                    statusMessage.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {statusMessage.text}
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
                        onChange={(e) => setShowConfirm(!showConfirm)}
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