"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfileApi } from "@/lib/user";

export function AdminTopbar({ setOpen }: any) {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        setName(data.name || "");
      } catch (err) {
        console.error("Profile load failed", err);
      }
    };

    fetchProfile();
  }, []);

  const initial = name ? name.charAt(0).toUpperCase() : "A";

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b flex items-center justify-between px-4 sm:px-8 z-40">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-600">
          {name || "Admin"}
        </span>

        <div className="h-9 w-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">
          {initial}
        </div>
      </div>
    </header>
  );
}
