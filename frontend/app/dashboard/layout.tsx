"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { useState } from "react";

export default function DashboardLayout({ children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sidebar open={open} setOpen={setOpen} />

      <Topbar setOpen={setOpen} />

      <main className="pt-16 lg:pl-64 bg-slate-50 h-screen overflow-y-auto no-scrollbar">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
