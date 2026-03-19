"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logoutApi } from "@/lib/auth";

export function UserNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Logout error");
    }

    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <img src="/eye1.png" className="h-12 w-12" />
          <span className="text-lg font-semibold">GlucoScan</span>
        </div>

        {/* CENTER - Menu */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </Link>

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
            href="/dashboard/profile"
            className="text-sm text-gray-600 hover:text-black"
          >
            Profile
          </Link>
        </div>

        {/* RIGHT - Profile + Logout */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <User size={18} />
            <span className="text-sm">User</span>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
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

            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>

            <Link href="/dashboard/upload" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Upload
              </Button>
            </Link>

            <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Profile
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-red-500"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
