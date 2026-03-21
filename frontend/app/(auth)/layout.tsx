"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE — Image + Branding */}
      <div className="hidden lg:flex relative items-center justify-center text-white p-20 overflow-hidden">
        {/* Background Image */}
        <img
          src="/eye1.png" //  put image in /public
          alt="Glaucoma Detection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 to-cyan-700/80" />

        {/* Content */}
        <div className="relative max-w-lg space-y-6 z-10">
          <h1 className="text-5xl font-bold leading-tight">
            AI-Powered <br /> Glaucoma Detection
          </h1>

          <p className="text-teal-100 text-lg leading-relaxed">
            Early detection saves sight. Upload retinal images and receive
            instant AI diagnostics.
          </p>
        </div>
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
