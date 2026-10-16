'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between px-6 py-6 overflow-hidden bg-stone-900 text-stone-100">
      
      {/* 1. Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          priority
          className="object-cover opacity-90"
        />
        {/* Dark subtle overlay for high contrast text readability without white boxes */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Top Header Navigation (Transparent Flexbox) */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-3 px-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
        {/* Left Side: Logo & Branding */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white shadow-sm">
            <Image 
              src="/ABUAD%20LOGO.jpg" 
              alt="ABUAD Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">ABUAD</h2>
            <p className="text-[11px] text-stone-300">Attendance Management System</p>
          </div>
        </div>

        {/* Right Side: Sign Up Link */}
        <div>
          <Link 
            href="/signup" 
            className="px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 backdrop-blur-sm"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* 3. Center Hero Section (Transparent Center Card) */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-12 px-4">
        <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl border border-white/15">
          <span className="text-xs font-bold tracking-widest text-stone-300 uppercase">
            ATTENDANCE ACCESS
          </span>
          
          <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide mt-2 leading-snug drop-shadow-md">
            COLLEGE OF MEDICINE AND HEALTH SCIENCES
          </h1>
          
          <div className="w-24 h-1 bg-[#8B1E3F] mx-auto my-6 rounded-full" />

          {/* Login Button with Hover CSS Effect */}
          <Link 
            href="/login"
            className="inline-block w-full sm:w-auto px-10 py-3.5 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-500/30"
          >
            Login
          </Link>
        </div>
      </section>

      {/* 4. Footer Details (Transparent Glass Footer) */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-4 flex justify-between items-center text-[10px] text-stone-300 font-medium bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 shadow-lg">
        <div>
          Developed by <span className="font-bold text-white">OJO JOSHUA OLUWAPELUMI</span>
        </div>
        <div className="text-right">
          Courtesy of the Dean,<br />
          College of Medicine & Health Sciences, ABUAD
        </div>
      </footer>

    </main>
  );
}