"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/marketing/Navbar.tsx";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div>
              <span className="bg-gray-100 text-teal-600 px-4 py-1 rounded-full text-sm">
                About GlaucomaDetect
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Empowering Early{" "}
                <span className="text-teal-600">Glaucoma Detection</span>
              </h1>

              <p className="mt-6 text-gray-600 text-lg">
                GlaucomaDetect aims to democratize access to early glaucoma
                detection using AI. We believe advanced eye care should be
                accessible to everyone, regardless of location or cost.
              </p>

              <div className="mt-6">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Try Now
                </Button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
              <img
                src="/eye1.png"
                alt="AI Eye"
                className="max-h-[300px] object-contain"
              />
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              Our system uses the{" "}
              <span className="font-semibold">InceptionV3</span>
              deep learning architecture trained on the ACRIMA dataset to
              analyze retinal fundus images. It detects subtle signs of
              glaucoma-related optic nerve damage and provides instant screening
              results with high accuracy.
            </p>
          </div>

          {/* FEATURES */}
          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Web-Based Access",
              "AI-Powered Detection",
              "Secure & Private",
              "Instant Results",
              "History Tracking",
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-800">✓ {feature}</p>
              </div>
            ))}
          </div>

          {/* LEGAL NOTICE */}
          <div className="mt-20 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
            <p className="text-sm text-gray-700">
              ⚖️ <span className="font-semibold">Legal Notice:</span> This
              system is intended for preliminary screening only and should not
              replace professional medical diagnosis. Always consult a qualified
              ophthalmologist.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
