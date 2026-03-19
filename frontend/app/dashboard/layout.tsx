"use client";

import { CTA } from "@/components/marketing/CTA";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Navbar } from "@/components/marketing/Navbar";

export default function DashboardLayout({ children }: any) {
  return (
    <>
      {/* Same Navbar everywhere */}
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />

      {/* Main Content */}
      <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </>
  );
}
