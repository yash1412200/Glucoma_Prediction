"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import api from "@/lib/api";
import { loginApi } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await loginApi(email.trim().toLowerCase(), password.trim());

      sessionStorage.setItem("isLoggedIn", "true");

      const profile = await api.get("/api/user/profile");

      if (profile.data.role === "admin") {
        window.location.href = "/dashboard-admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl" // 🔥 CHANGED HERE
    >
      <Card className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
        <CardContent className="p-10 space-y-6">
          {" "}
          {/* 🔥 more padding */}
          {/* HEADER */}
          <div className="flex flex-col items-center space-y-4">
            <img src="/eye1.png" className="h-12 w-14" alt="" />

            <h2 className="text-2xl font-bold">Welcome Back</h2>

            <p className="text-sm text-gray-500 text-center">
              Sign in to access AI-powered diagnostics
            </p>
          </div>
          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <FloatingInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <div className="space-y-2">
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-teal-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white text-base"
            >
              Sign In
            </Button>
          </form>
          {/* FOOTER */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-teal-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
