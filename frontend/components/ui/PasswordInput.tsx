"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function PasswordInput({ label, value, onChange, ...props }: Props) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full h-14 px-4 pt-6 pr-12 rounded-xl border border-gray-200 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
          "transition-all duration-300"
        )}
      />

      <label
        className={cn(
          "absolute left-4 text-gray-500 transition-all duration-300 pointer-events-none",
          value || focused
            ? "text-xs top-2 text-teal-600"
            : "top-3.5 text-sm"
        )}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-3 text-gray-500 hover:text-teal-600"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}