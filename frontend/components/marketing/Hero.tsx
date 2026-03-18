"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full bg-slate-50 min-h-screen pt-28 pb-16 sm:pb-20 lg:pb-0 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-400/20 rounded-full blur-3xl" />
      </div>

      {/* WARNING BANNER */}
      <div className="w-full bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-sm py-3 px-4 text-center">
        ⚠️ This tool is intended for educational and research purposes only. It
        does not provide medical diagnosis and is not a substitute for
        professional medical consultation. Always consult with a qualified
        healthcare provider.
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1 text-sm bg-slate-100 rounded-full text-teal-700">
            AI-Powered Diagnostics
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Glaucoma Detection
            </span>{" "}
            System
          </h1>

          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Early detection saves sight. Upload retinal fundus images and
            receive instant, AI-driven glaucoma screening with clinical-grade
            accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto">
                Get Started
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outline" className="w-full sm:w-auto">
                Upload Eye Image
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl bg-white flex items-center justify-center p-4"
        >
          <img
            src="/eye1.png"
            alt="Glaucoma AI"
            className="w-full max-w-md lg:max-w-lg object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
