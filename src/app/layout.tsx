import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const syneFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Portavia — Duncan Robert | Digital Designer & Developer",
  description: "A modern portfolio website showcasing digital design, UI/UX, and Framer development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${syneFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F1115]">{children}</body>
    </html>
  );
}
