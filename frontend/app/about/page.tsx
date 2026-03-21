"use client";

import { Navbar } from "@/components/marketing/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="pt-24 md:pt-28 px-4 sm:px-6 min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            About <span className="text-teal-600">GlaucomaDetect</span>
          </h1>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-10 space-y-8">
            {/* MISSION */}
            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GlaucomaDetect aims to democratize access to early glaucoma
                detection by leveraging artificial intelligence and deep
                learning. We believe that advanced eye care should be accessible
                to everyone, regardless of geographical location or economic
                status.
              </p>
            </div>

            {/* HOW IT WORKS */}
            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-3">
                How It Works
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our system uses the{" "}
                <span className="font-semibold">InceptionV3</span> deep learning
                architecture, trained on the public ACRIMA dataset, to analyze
                retinal fundus images. The model detects subtle signs of
                glaucoma-related optic nerve damage with high accuracy,
                providing instant screening results.
              </p>
            </div>

            {/* FEATURES */}
            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-4">
                Key Features
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  ✓ <span className="font-medium">Web-Based Access:</span> No
                  installation required, works on any device with a browser
                </p>
                <p>
                  ✓ <span className="font-medium">AI-Powered:</span> Advanced
                  deep learning model for accurate detection
                </p>
                <p>
                  ✓ <span className="font-medium">Secure:</span>{" "}
                  Healthcare-grade encryption and privacy protection
                </p>
                <p>
                  ✓ <span className="font-medium">Instant Results:</span> Get
                  analysis in seconds, not days
                </p>
                <p>
                  ✓ <span className="font-medium">History Tracking:</span>{" "}
                  Maintain records of all screenings
                </p>
              </div>
            </div>

            {/* LEGAL NOTICE */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                ⚖️ <span className="font-semibold">Legal Notice:</span> This
                system is intended for preliminary screening purposes only and
                should not be used as a substitute for professional medical
                diagnosis. Always consult with a qualified ophthalmologist.
              </p>
            </div>

            {/* ACKNOWLEDGMENT */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-teal-600 mb-2">
                Acknowledgment
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                We gratefully acknowledge the Research & Development Cell of
                Rashtrasant Tukadoji Maharaj Nagpur University for providing
                financial support for this project under the University Research
                Project Scheme.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
