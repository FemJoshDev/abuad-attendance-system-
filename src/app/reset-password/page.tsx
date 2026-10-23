'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Missing or invalid reset token.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      setMessage(data.message);
      setTimeout(() => {
        router.push('/login');
      }, 3000); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-stone-900 text-stone-100">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/ABUAD%20ATTENDANCE.jpg" 
            alt="ABUAD Gate Background"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
        <div className="relative z-10 max-w-lg w-full bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 p-8 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Invalid Link</h2>
          <p className="text-xs text-stone-300 mb-4">This password reset link is missing a valid token.</p>
          <Link href="/forgot-password" className="text-stone-200 hover:text-white underline text-xs font-medium">
            Request a new reset link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-stone-900 text-stone-100">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Card Container */}
      <div 
        className="relative z-10 max-w-lg w-full bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 p-8 md:p-10 my-6"
        suppressHydrationWarning
      >
        
        {/* Top Header Bar Inside Card */}
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10 mb-6">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white shadow-sm flex-shrink-0">
            <Image 
              src="/ABUAD%20LOGO.jpg" 
              alt="ABUAD Logo"
              fill
              sizes="(max-width: 768px) 100vw, 40px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">ABUAD</h2>
            <p className="text-[11px] text-stone-300">Attendance Management System</p>
          </div>
        </div>

        {/* Section Title Block */}
        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-widest text-stone-300 uppercase">
            SECURITY SETUP
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide mt-1">
            Set New Password
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Please enter your new secure password below.
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-500/30 disabled:opacity-50 mt-2"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {/* Footer Details */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-stone-300 font-medium">
          <div>
            Developed by <span className="font-bold text-white">OJO JOSHUA OLUWAPELUMI</span>
          </div>
          <div className="text-right">
            Courtesy of the Dean,<br />
            College of Medicine & Health Sciences, ABUAD
          </div>
        </div>

      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="relative min-h-screen flex items-center justify-center bg-stone-900 text-white">Loading...</main>}>
      <ResetPasswordForm />
    </Suspense>
  );
}