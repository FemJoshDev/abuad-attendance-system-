// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMHS ABUAD Attendance System",
  description: "Secure Attendance Portal for Afe Babalola University",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-[#fbf9f0] text-[#171717] overflow-x-hidden">
        
        {/* =========================================================
            1. GLOBAL BACKGROUND IMAGE LAYER
           ========================================================= */}
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

        {/* =========================================================
            2. GLOBAL CONTENT CONTAINER & FOOTER WRAPPER
           ========================================================= */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <div className="flex-1">
            {children}
          </div>

          {/* Global Footer (Pushed to the bottom cleanly with proper desktop sidebar offset) */}
          <div className="w-full px-4 sm:px-6 pb-6 pt-8 lg:pl-[225px]">
            <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs text-white/90 font-medium bg-[#570015]/90 backdrop-blur-md px-5 py-3.5 rounded-lg border border-white/15 shadow-lg text-center sm:text-left">
              <div>
                Developed by <span className="font-bold text-white tracking-wide">OJO JOSHUA OLUWAPELUMI</span>
              </div>
              <div className="text-center sm:text-right leading-tight text-white/80">
                Courtesy of the Dean, College of Basic Medical Sciences, ABUAD<br />
                <span className="font-semibold text-white">Dr. Oniyide Adesola</span>
              </div>
            </footer>
          </div>
        </div>

      </body>
    </html>
  );
}