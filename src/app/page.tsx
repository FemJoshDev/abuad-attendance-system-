'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col justify-between px-3 sm:px-6 py-4 sm:py-6 overflow-x-hidden bg-stone-900 text-stone-100">
      
      {/* 1. Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        {/* Dark subtle overlay for high contrast text readability */}
        <div className="absolute inset-0 bg-[#590018]/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Top Header Navigation (Transparent Flexbox) */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
        {/* Left Side: Logo & Branding */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 group">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 bg-white shadow-sm shrink-0">
            <Image 
              src="/ABUAD%20LOGO.jpg" 
              alt="ABUAD Logo"
              fill
              sizes="(max-width: 768px) 32px, 40px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white leading-tight group-hover:text-stone-200 transition">ABUAD</h2>
            <p className="text-[10px] sm:text-[11px] text-stone-300">Attendance Management System</p>
          </div>
        </div>

        {/* Right Side: Sign Up Link */}
        <div>
          <Link 
            href="/signup" 
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 backdrop-blur-sm whitespace-nowrap"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* 3. Center Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12 px-3 sm:px-4">
        <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-white/15">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-stone-300 uppercase">
            ATTENDANCE ACCESS
          </span>
          
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase tracking-wide mt-2 leading-snug drop-shadow-md">
            COLLEGE OF MEDICINE AND HEALTH SCIENCES
          </h1>
          
          <div className="w-16 sm:w-24 h-1 bg-[#8B1E3F] mx-auto my-4 sm:my-6 rounded-full" />

          {/* Login Button: Triggers Role Selection Modal */}
          <button 
            type="button"
            onClick={() => setShowRoleModal(true)}
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-500/30 cursor-pointer"
          >
            Login
          </button>
        </div>
      </section>

      {/* 5. Role Gateway Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
          <div 
            className="relative w-full max-w-xl bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 text-stone-100"
            suppressHydrationWarning
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 sm:mb-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                  Select Portal Access
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-300">
                  Choose your account type to continue
                </p>
              </div>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-stone-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Portal Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Student Portal */}
              <Link 
                href="/login"
                className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#8B1E3F] transition-all duration-200 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">🎓</div>
                <h3 className="font-bold text-white text-xs sm:text-sm">Student</h3>
                <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 sm:mt-1">Matric No. / Email</p>
              </Link>

              {/* Lecturer Portal */}
              <Link 
                href="/login/lecturer"
                className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#8B1E3F] transition-all duration-200 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
                <h3 className="font-bold text-white text-xs sm:text-sm">Lecturer</h3>
                <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 sm:mt-1">Staff Credentials</p>
              </Link>

              {/* Admin Portal */}
              <Link 
                href="/login/admin"
                className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#8B1E3F] transition-all duration-200 text-center"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">🛡️</div>
                <h3 className="font-bold text-white text-xs sm:text-sm">Admin</h3>
                <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 sm:mt-1">System Management</p>
              </Link>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 text-center">
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-xs text-stone-400 hover:text-white underline transition cursor-pointer"
              >
                Cancel and return to homepage
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}