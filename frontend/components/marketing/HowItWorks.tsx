"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    desc: "Upload a retinal fundus image in JPG or PNG format",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    desc: "Our deep learning model analyzes the optic disc and nerve fiber layer",
  },
  {
    icon: FileCheck,
    title: "Get Results",
    desc: "Receive a detailed diagnosis with confidence scoring",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>

        <p className="text-gray-600 mb-12 sm:mb-16 max-w-xl mx-auto">
          Three simple steps to screen for glaucoma
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <step.icon className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 mx-auto mb-5" />

              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
