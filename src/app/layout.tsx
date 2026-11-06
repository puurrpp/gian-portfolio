import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Gian Jim Bernales // AI & Full-Stack Engineer",
  description: "Portfolio of Gian Jim Bernales, AI & Computer Vision Engineer and Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} bg-[#050508] text-zinc-100 antialiased selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
