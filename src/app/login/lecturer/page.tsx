'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LecturerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login/lecturer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in.');
      }

      // Replace the login page after successful authentication.
      router.replace('/lecturer/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between px-6 py-6 overflow-hidden bg-stone-900 text-stone-100">
      
      {/* 1. Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#590018]/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-3 px-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white shadow-sm">
            <Image 
              src="/ABUAD%20LOGO.jpg" 
              alt="ABUAD Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight group-hover:text-stone-200 transition">ABUAD</h2>
            <p className="text-[11px] text-stone-300">Lecturer Portal Access</p>
          </div>
        </Link>

        <div>
          <Link 
            href="/" 
            className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition border border-white/20 backdrop-blur-sm"
          >
            ← Back Home
          </Link>
        </div>
      </header>

      {/* 3. Central Login Form Card */}
      <section className="relative z-10 flex flex-col items-center justify-center my-auto py-8 px-4">
        <div 
          className="w-full max-w-md bg-black/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/15"
          suppressHydrationWarning
        >
          <div className="text-center mb-6">
            <span className="inline-block p-3 rounded-full bg-white/10 border border-white/20 text-2xl mb-2">
              👨‍🏫
            </span>
            <h1 className="text-xl font-bold text-white uppercase tracking-wide">
              Lecturer Sign In
            </h1>
            <p className="text-xs text-stone-300 mt-1">
              Enter your official ABUAD staff credentials
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-200 mb-1">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                suppressHydrationWarning
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lecturer@abuad.edu.ng"
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-200 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                suppressHydrationWarning
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <Link 
                href="/forgot-password" 
                className="text-stone-300 hover:text-white underline transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-red-500/30 disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>
      </section>

      {/* 4. Footer */}
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
