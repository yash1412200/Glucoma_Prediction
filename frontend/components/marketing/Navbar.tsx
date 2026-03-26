"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); //  NEW

  //  Check login using cookie
  useEffect(() => {
    const status = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
    setLoading(false);
  }, []);

  //  Logout handler
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {}

    // remove session state
    sessionStorage.removeItem("isLoggedIn");

    //  redirect to home
    window.location.href = "/";
  };
  //  Prevent flicker
  if (loading) {
    return <div className="h-16"></div>; // placeholder navbar height
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/eye1.png"
            alt="GlucoScan Logo"
            className="h-14 w-14 object-contain"
          />
          <span className="text-lg font-semibold">GlaucoScan</span>
        </div>

        {/* CENTER - Menu */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-black"
          >
            About
          </Link>

          {isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-black"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/upload"
                className="text-sm text-gray-600 hover:text-black"
              >
                Upload
              </Link>

              <Link
                href="/dashboard/reports"
                className="text-sm text-gray-600 hover:text-black"
              >
                Reports
              </Link>

              <Link
                href="/dashboard/profile"
                className="text-sm text-gray-600 hover:text-black"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* RIGHT - Auth */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                Log in
              </Link>

              <Link href="/register">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
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

            {isLoggedIn && (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>

                <Link
                  href="/dashboard/upload"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Upload
                  </Button>
                </Link>

                <Link
                  href="/dashboard/reports"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Reports
                  </Button>
                </Link>

                <Link
                  href="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="w-full text-red-500"
                variant="outline"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
