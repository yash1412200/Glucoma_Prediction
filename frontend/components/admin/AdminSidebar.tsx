"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  Activity,
  LogOut,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutApi } from "@/lib/auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard-admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard-admin/users", icon: Users },
  { name: "Activity Logs", href: "/dashboard-admin/activity", icon: Activity },
  {
    name: "System Settings",
    href: "/dashboard-admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar({ open, setOpen }: any) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutApi();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-white border-r z-50 transform transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b font-semibold text-lg">
          Admin Panel
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                  active
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:bg-slate-100",
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-500 transition"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
