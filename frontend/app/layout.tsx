import "./globals.css";
import { Toaster } from "sonner";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GlucoScan",
  description: "AI-Powered Glaucoma Detection System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}