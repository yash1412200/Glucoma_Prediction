"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-teal-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Start Screening Today
        </h2>

        <p className="mb-8 text-teal-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Early detection can prevent vision loss. Let AI assist your diagnosis.
        </p>

        <Link href="/register">
          <Button className="bg-white text-teal-600 hover:bg-gray-100 w-full sm:w-auto">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
