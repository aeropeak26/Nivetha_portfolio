"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profileData";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-[#F8F9FA] text-[#0F1115] border-t border-gray-200">
      {/* Light Theme Footer Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-gray-200">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-9 h-9 rounded-full bg-[#0F1115] text-white flex items-center justify-center font-black text-base group-hover:bg-indigo-600 transition-colors shadow-sm">
                ✦
              </div>
              <span className="font-black text-2xl tracking-tight text-[#0F1115] font-display">
                Nivetha Velusamy
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed">
              UI/UX Designer, Visual Designer & Front-End Developer. Dedicated to crafting user-centered interfaces, intuitive design systems, and engaging web experiences.
            </p>
          </div>

          {/* Social Icon Pills */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:nivethav012@gmail.com"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[#0F1115] flex items-center justify-center hover:bg-[#0F1115] hover:text-white hover:border-[#0F1115] transition-all duration-200 shadow-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* LinkedIn Icon SVG */}
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[#0F1115] flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm"
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
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-[#0F1115] flex items-center justify-center hover:bg-[#0F1115] hover:text-white hover:border-[#0F1115] transition-all duration-200 shadow-sm"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 text-xs sm:text-sm">
          
          {/* Featured Case Studies Column */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest mb-4">
              FEATURED CASE STUDIES
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0F1115]">
              <li><Link href="/projects/realestate-project" className="hover:text-indigo-600 transition-colors">Real Estate Portal</Link></li>
              <li><Link href="/projects/ecommerce-project" className="hover:text-indigo-600 transition-colors">Luxura E-Commerce</Link></li>
              <li><Link href="/projects/evento-app" className="hover:text-indigo-600 transition-colors">Evento Management App</Link></li>
              <li><Link href="/projects/crm-project" className="hover:text-indigo-600 transition-colors">Apex CRM Dashboard</Link></li>
              <li><Link href="/projects/dating-app" className="hover:text-indigo-600 transition-colors">Connect Matchmaking App</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0F1115]">
              <li><Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-indigo-600 transition-colors">About & Credentials</Link></li>
              <li><Link href="/projects" className="hover:text-indigo-600 transition-colors">All Projects List</Link></li>
              <li><Link href="/#services" className="hover:text-indigo-600 transition-colors">Core Expertise</Link></li>
              <li><Link href="/#contact" className="hover:text-indigo-600 transition-colors">Contact Me</Link></li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest mb-4">
              DIRECT CONTACT
            </h4>
            <div className="flex flex-col gap-2.5 font-semibold text-[#0F1115]">
              <a href="mailto:nivethav012@gmail.com" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                <span>nivethav012@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
              </a>
              <p>+91 9677700740</p>
              <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                Available for UI/UX & Web Development Roles
              </p>
            </div>
          </div>

          {/* Location Column */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest mb-4">
              LOCATION
            </h4>
            <div className="flex flex-col gap-1.5 font-semibold text-[#0F1115]">
              <p>Punjai Puliampatti</p>
              <p>Coimbatore, Tamil Nadu</p>
              <p className="text-gray-500 font-medium">India</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-gray-500 gap-4">
          <p>© 2026 Nivetha Velusamy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="hover:text-indigo-600 transition-colors">Browse Projects</Link>
            <a href="mailto:nivethav012@gmail.com" className="hover:text-indigo-600 transition-colors">Email Me</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
