
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Newsroom Copilot",
  description: "Editorial Intelligence System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-[#0a0a0a] text-gray-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200"
      >
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[100px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
