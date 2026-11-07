// src/app/student/layout.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      
      {/* =========================================================
          1. MOBILE TOP HEADER BAR (Visible only on small screens)
         ========================================================= */}
      <div className="flex lg:hidden items-center justify-between bg-[#570015] text-white px-5 py-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/25 transition focus:outline-none cursor-pointer"
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-sm font-bold tracking-wide">ABUAD Portal</p>
            <p className="text-[10px] text-white/70">Student Navigation</p>
          </div>
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
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/student/dashboard" className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/dashboard') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`}>Dashboard</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/student/courses" className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/courses') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`}>My Courses</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/student/attendance" className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/attendance') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`}>Attendance History</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/student/complaints" className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/complaints') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`}>Complaints &amp; Disputes</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/student/settings" className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/settings') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`}>Settings</Link>
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
          3. DESKTOP FIXED SIDEBAR
         ========================================================= */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[205px] flex-col bg-[#570015] px-5 py-7 text-white lg:flex shadow-xl">
        <div className="mb-12 border-b border-white/15 pb-6">
          <p className="text-lg font-bold tracking-wide">ABUAD</p>
          <p className="mt-1 text-xs text-white/65">Student Portal</p>
        </div>
        <nav className="space-y-2 text-sm">
          <Link className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/dashboard') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`} href="/student/dashboard">Dashboard</Link>
          <Link className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/courses') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`} href="/student/courses">My Courses</Link>
          <Link className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/attendance') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`} href="/student/attendance">Attendance History</Link>
          <Link className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/complaints') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`} href="/student/complaints">Complaints &amp; Disputes</Link>
          <Link className={`block rounded-md px-3 py-3 transition ${pathname?.includes('/settings') ? 'bg-white/15 font-semibold' : 'text-white/75 hover:bg-white/10'}`} href="/student/settings">Settings</Link>
        </nav>
        <button onClick={() => router.push('/login')} className="mt-auto rounded-md border border-white/25 px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 cursor-pointer">
          Sign out
        </button>
      </aside>

      {/* =========================================================
          4. MAIN CONTAINER INJECTOR
         ========================================================= */}
      <div className="min-h-screen lg:ml-[205px]">
        {children}
      </div>

    </div>
  );
}