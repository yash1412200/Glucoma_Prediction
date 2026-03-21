"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE — Image + Text (CLEAN) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-teal-600 to-cyan-600 text-white p-20 text-center">
        {/* IMAGE */}
        <img
          src="/eye1.png"
          alt="Glaucoma Detection"
          className="w-64 mb-8 object-contain"
        />

        {/* TEXT */}
        <h1 className="text-4xl font-bold leading-tight mb-4">
          AI-Powered <br /> Glaucoma Detection
        </h1>

        <p className="text-teal-100 text-lg max-w-md leading-relaxed">
          Early detection saves sight. Upload retinal images and receive instant
          AI diagnostics.
        </p>
      </div>

      {/* RIGHT SIDE — Form */}
      <div className="relative flex items-center justify-center bg-slate-100 p-6">
        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl" />

        {children}
      </div>
    </div>
  );
}
