"use client";

import { Shield, Zap, Bot } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "HIPAA-compliant data handling",
  },
  {
    icon: Zap,
    title: "Fast Results",
    desc: "Analysis in under 30 seconds",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    desc: "Trained on 100k+ fundus images",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-7 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition duration-300"
            >
              <feature.icon className="text-teal-600 w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />

              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  {feature.title}
                </h4>

                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
