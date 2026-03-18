"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/eye1.jpg" // ✅ correct path
            alt="GlucoScan Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-semibold">GlucoScan</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            About
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Log in
          </Link>

          <Link href="/register">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col px-6 py-5 gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>

            <Link href="/about" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                About
              </Button>
            </Link>

            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>

            <Link href="/register" onClick={() => setMenuOpen(false)}>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
