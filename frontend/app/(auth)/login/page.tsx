"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import api from "@/lib/api";
import { loginApi } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  /* -------------------- FORM STATE -------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* -------------------- LOGIN HANDLER -------------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    console.log("SENDING:", cleanEmail, cleanPassword);

    try {
      await loginApi(cleanEmail, cleanPassword);

      const profile = await api.get("/api/user/profile");

      console.log("PROFILE:", profile.data);

      if (profile.data.role === "admin") {
        router.push("/dashboard-admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };
  /* -------------------- UI (UNCHANGED) -------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-teal-100 rounded-full">
              <Eye className="h-6 w-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-500 text-center">
              Sign in to access AI-powered diagnostics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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

              {/*  FORGOT PASSWORD LINK */}
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
              className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>

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
