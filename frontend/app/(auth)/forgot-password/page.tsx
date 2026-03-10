"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { toast } from "sonner";
import { forgotPasswordApi } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      toast.error("Please enter your email");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // BACKEND INTEGRATION
      await forgotPasswordApi(cleanEmail);

      toast.success("OTP sent to your email");

      // pass email to next page
      router.push(`/verify-reset-otp?email=${encodeURIComponent(cleanEmail)}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <Card className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your registered email to receive OTP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
