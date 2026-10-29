'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  // 1. React Local State Management for form inputs and UI feedback
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle form submission when the user clicks "Sign In"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser page refresh on form submit
    setError(null);     // Clear any previous error messages
    setIsLoading(true); // Turn on loading state to disable button / show feedback

    try {
      // 3. Call NextAuth's client-side signIn function
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic page reload so we can handle errors manually
        email,
        password,
      });

      // 4. Check if authentication failed on the backend
      if (result?.error) {
        setError(result.error); // Display the error message thrown by our backend
        setIsLoading(false);    // Turn off loading state
      } else {
        // Replace the login entry so Back does not return to the sign-in form.
        // A refresh here would refresh the login route during navigation.
        router.replace('/student/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    // Outer container matching the dark themed background wrapper and brightness of landing/signup
    <main className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-stone-900 text-stone-100">
      
      {/* Background Image with Matched Opacity & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/ABUAD%20ATTENDANCE.jpg" 
          alt="ABUAD Gate Background"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#590018]/40 backdrop-blur-[1px]" />
      </div>

      {/* Login Card Container matching the sign-up glassmorphism style proportions */}
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
            STUDENT PORTAL
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide mt-1">
            Sign In to Your Account
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Matric Input Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-200 mb-1">
              Email
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@abuad.edu.ng"
              className="w-full px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] text-stone-900 text-sm bg-white/95"
            />
          </div>

          {/* Password Input Field */}
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

          {/* Links Row: Forgot Password (Left) & Sign Up (Right) */}
          <div className="flex justify-between items-center text-xs">
            <Link href="/forgot-password" className="text-stone-300 hover:text-white underline font-medium">
              Forgot password?
            </Link>
            <Link href="/signup" className="text-stone-200 hover:text-white font-bold underline">
              Don't have an account? Sign up
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#5A0B1B] hover:bg-[#7A1226] text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-500/30 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
