"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resendOtpApi, verifyResetOtpApi } from "@/lib/auth";

export default function VerifyResetOtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* ---------------- SAFETY ---------------- */

  useEffect(() => {
    if (!email) {
      toast.error("Email missing. Please try again.");
      router.replace("/forgot-password");
    }
  }, [email, router]);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- INPUT HANDLING ---------------- */

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    if (!email) return;

    try {
      setIsVerifying(true);

      // ✅ BACKEND VERIFY
      await verifyResetOtpApi(email, enteredOtp);

      toast.success("OTP verified successfully!");

      router.replace(
        `/reset-password?email=${encodeURIComponent(email)}&otp=${enteredOtp}`,
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  /* ---------------- RESEND OTP ---------------- */

  const handleResend = async () => {
    if (!email) return;

    try {
      await resendOtpApi(email);

      setTimer(60);
      setOtp(Array(6).fill(""));
      setActiveIndex(0);
      inputsRef.current[0]?.focus();

      toast.success("OTP resent successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
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
        <CardContent className="p-8 space-y-6 text-center">
          <div>
            <h2 className="text-2xl font-semibold">Verify Reset OTP</h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter the 6-digit OTP sent to your email
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setActiveIndex(index)}
                className={`w-12 h-14 text-center text-lg font-semibold rounded-xl border transition-all duration-200 ${
                  activeIndex === index
                    ? "border-teal-600 ring-2 ring-teal-200"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="text-sm text-gray-500 mt-2">
            {timer > 0 ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-teal-600 font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover:shadow-lg mt-4"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
