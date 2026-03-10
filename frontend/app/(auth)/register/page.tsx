"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { registerApi } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerApi(
        name.trim(),
        email.trim().toLowerCase(),
        password.trim(),
      );

      // redirect ONLY after success
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

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
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-gray-500 text-center">
              Join GlucoScan AI diagnostics
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              placeholder="Full Name"
              className="h-11 focus-visible:ring-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Email address"
              type="email"
              className="h-11 focus-visible:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              className="h-11 focus-visible:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover:shadow-lg"
            >
              Create Account
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
