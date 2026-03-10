"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { toast } from "sonner";
import { resetPasswordApi } from "@/lib/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");
  const otp = params.get("otp");

  /* ---------------- STATE ---------------- */

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- SAFETY ---------------- */

  useEffect(() => {
    if (!email || !otp) {
      toast.error("Invalid reset link. Please try again.");
      router.replace("/forgot-password");
    }
  }, [email, otp, router]);

  /* ---------------- HANDLE RESET ---------------- */

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Enter new password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!email || !otp) return;

    try {
      setLoading(true);

      //  BACKEND INTEGRATION
      await resetPasswordApi(email, otp, password);

      toast.success("Password reset successfully");
      router.replace("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md"
    >
      <Card className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Reset Password</h2>
          </div>

          <form onSubmit={handleReset} className="space-y-5">
            <PasswordInput
              label="New Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
