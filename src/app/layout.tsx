import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Nivetha Velusamy — UI/UX Designer & Front-End Developer | Portfolio",
  description:
    "Portfolio of Nivetha Velusamy, UI/UX Designer & Visual Designer based in Coimbatore, India. Showcasing Figma UI/UX case studies, web design systems, interactive prototypes, and front-end development.",
  keywords: [
    "Nivetha Velusamy",
    "UI/UX Designer",
    "Visual Designer",
    "Front-End Developer",
    "Figma Specialist",
    "React Developer",
    "Next.js Portfolio",
    "Coimbatore India Designer",
  ],
  authors: [{ name: "Nivetha Velusamy" }],
  creator: "Nivetha Velusamy",
  icons: {
    icon: "/images/Profile.png",
    shortcut: "/images/Profile.png",
    apple: "/images/Profile.png",
  },
  openGraph: {
    title: "Nivetha Velusamy — UI/UX Designer & Front-End Developer",
    description:
      "Crafting intuitive, user-centered digital solutions with clean visuals, Figma design systems, and front-end code.",
    siteName: "Nivetha Velusamy Portfolio",
    images: [
      {
        url: "/images/Profile.png",
        width: 800,
        height: 800,
        alt: "Nivetha Velusamy Profile",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivetha Velusamy — UI/UX Designer & Front-End Developer",
    description:
      "Crafting intuitive, user-centered digital solutions with clean visuals and front-end code.",
    images: ["/images/Profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F1115] font-sans">
        {children}
      </body>
    </html>
  );
}
