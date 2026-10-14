'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      // This sends the email and password securely to our backend route handler ([...nextauth]/route.ts)
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
        // 5. Success! Authentication passed, session cookie is set. Redirect to dashboard.
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      // Catch any unexpected network or system errors
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    // Outer container matching ABUAD cream background aesthetic
    <main className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden p-8">
        
        {/* Header / Brand Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5A0B1B] text-white text-2xl font-bold mb-4 shadow-md">
            AB
          </div>
          <h1 className="text-2xl font-bold text-stone-900">ABUAD Attendance</h1>
          <p className="text-sm text-stone-500 mt-1">Sign in to access your portal</p>
        </div>

        {/* Dynamic Error Alert Banner (Only shows if there's an error) */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on user keystroke
              placeholder="e.g. student@abuad.edu.ng"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5A0B1B] focus:border-transparent text-stone-800 text-sm"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on user keystroke
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5A0B1B] focus:border-transparent text-stone-800 text-sm"
            />
          </div>

          {/* Submit Button with dynamic loading state */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#5A0B1B] hover:bg-[#450814] text-white font-medium rounded-lg transition-colors shadow-md text-sm disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs text-stone-400">
          Afe Babalola University Ado-Ekiti • Secure Attendance Portal
        </div>

      </div>
    </main>
  );
}