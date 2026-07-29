"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, Globe, Code } from "lucide-react";
import { profileData } from "@/data/profileData";

export default function Footer() {
  return (
    <footer className="pt-12 bg-[#08090A]">
      {/* Curved Arch Footer Container */}
      <div className="max-w-6xl mx-auto bg-[#E5FE00] text-[#0B0C0E] rounded-t-3xl md:rounded-footer-arch px-6 sm:px-12 pt-14 pb-8 shadow-2xl">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-[#0B0C0E]/15">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center font-black text-base">
                ✦
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#0B0C0E]">
                Nivetha Velusamy
              </span>
            </Link>
            <p className="text-sm font-medium text-[#0B0C0E]/80 leading-relaxed">
              UI/UX Designer, Visual Designer & Front-End Developer. Crafting user-centered interfaces, modern design systems, and engaging digital solutions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:nivethav012@gmail.com"
              className="w-10 h-10 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            {/* LinkedIn Icon SVG */}
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
              </svg>
            </a>

            {/* GitHub Icon SVG */}
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 text-sm">
          {/* Featured Projects Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Featured Case Studies
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <li><Link href="/projects/realestate-project" className="hover:underline">Real Estate Portal</Link></li>
              <li><Link href="/projects/ecommerce-project" className="hover:underline">Luxura E-Commerce</Link></li>
              <li><Link href="/projects/evento-app" className="hover:underline">Evento Management App</Link></li>
              <li><Link href="/projects/crm-project" className="hover:underline">Apex CRM Dashboard</Link></li>
              <li><Link href="/projects/dating-app" className="hover:underline">Connect Matchmaking App</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/#about" className="hover:underline">About & Credentials</Link></li>
              <li><Link href="/projects" className="hover:underline">All Projects List</Link></li>
              <li><Link href="/#services" className="hover:underline">Core Expertise</Link></li>
              <li><Link href="/#contact" className="hover:underline">Contact Me</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <a href="mailto:nivethav012@gmail.com" className="hover:underline flex items-center gap-1">
                <span>nivethav012@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p>+91 9677700740</p>
              <p className="text-xs text-[#0B0C0E]/60 font-normal">Available for UI/UX & Web Development Roles</p>
            </div>
          </div>

          {/* Location Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Location
            </h4>
            <div className="flex flex-col gap-2 font-semibold text-[#0B0C0E]/80">
              <p>Punjai Puliampatti</p>
              <p>Coimbatore, Tamil Nadu</p>
              <p>India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0B0C0E]/15 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-[#0B0C0E]/70 gap-4">
          <p>© 2026 Nivetha Velusamy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/projects" className="hover:underline">Browse Projects</Link>
            <a href="mailto:nivethav012@gmail.com" className="hover:underline">Email Me</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
