"use client";

import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  ...props
}: Props) {
  const isActive = !!value;

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={cn(
          "w-full h-14 px-4 pt-6 rounded-xl border border-gray-200 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
          "transition-all duration-300",
        )}
      />

      <label
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none",
          isActive
            ? "text-xs top-2 text-teal-600"
            : "top-5 text-sm text-gray-400",
        )}
      >
        {label}
      </label>
    </div>
  );
}
