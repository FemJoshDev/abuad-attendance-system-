'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();

  // Form input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI status state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle registration submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end password check
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          matricNumber,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed.');
        setIsLoading(false);
      } else {
        // Success! Automatically redirect to the login page
        router.push('/login?registered=true');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-stone-900 text-stone-100">
      
      {/* 1. Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. Glassmorphism Card Container */}
      <div className="relative z-10 max-w-lg w-full bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 p-8 md:p-10 my-6">
        
        {/* Top Header Bar Inside Card */}
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10 mb-6">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white shadow-sm flex-shrink-0">
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

        {/* Title Block */}
        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-widest text-stone-300 uppercase">
            STUDENT REGISTRATION
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide mt-1">
            Create Your Account
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            College of Medicine & Health Sciences
          </p>
        </div>

        {/* Dynamic Error Alert Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ojo Joshua"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@abuad.edu.ng"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Matric Number Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Matriculation Number
            </label>
            <input
              type="text"
              required
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="ABUAD/20/4521"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-500/30 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Existing User Redirect Link */}
        <div className="mt-6 text-center text-xs text-stone-300">
          Already have an account?{' '}
          <Link href="/login" className="text-white underline font-bold hover:text-stone-100">
            Login here
          </Link>
        </div>

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