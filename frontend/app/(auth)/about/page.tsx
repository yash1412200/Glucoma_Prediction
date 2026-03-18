"use client";

import { Navbar } from "@/components/marketing/Navbar";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="pt-28 px-4 sm:px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - ALL CONTENT */}
          <div>
            <span className="bg-gray-100 text-teal-600 px-4 py-1 rounded-full text-sm">
              About GlaucomaDetect
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              AI-Powered{" "}
              <span className="text-teal-600">Glaucoma Detection</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              GlaucomaDetect aims to democratize access to early glaucoma
              detection using AI. We believe advanced eye care should be
              accessible to everyone.
            </p>

            {/* HOW IT WORKS INLINE */}
            <p className="mt-4 text-gray-600">
              Built on <span className="font-semibold">InceptionV3</span> and
              trained with ACRIMA dataset, our system analyzes retinal fundus
              images and detects early optic nerve damage instantly.
            </p>

            {/* FEATURES INLINE */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <p>✓ Web-Based Access</p>
              <p>✓ AI-Powered</p>
              <p>✓ Secure</p>
              <p>✓ Instant Results</p>
              <p>✓ History Tracking</p>
            </div>

            {/* BUTTON */}
            <div className="mt-6">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Try Now
              </Button>
            </div>

            {/* LEGAL (SMALL TEXT) */}
            <p className="mt-6 text-xs text-gray-500">
              ⚖️ For screening only. Not a replacement for professional
              diagnosis.
            </p>
          </div>

          {/* RIGHT SIDE - IMAGE CARD */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-center">
            <img
              src="/eye1.png"
              alt="AI Eye"
              className="max-h-[350px] object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}
