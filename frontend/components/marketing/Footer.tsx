"use client";

import { Eye } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          {/* Logo */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <Eye className="h-5 w-5 text-teal-600" />
            <span className="font-medium">
              GlucoScan — AI-Powered Glaucoma Detection
            </span>
          </div>

          {/* Copyright */}
          <p className="text-center md:text-right">
            © 2026 GlucoScan. For research and screening purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
