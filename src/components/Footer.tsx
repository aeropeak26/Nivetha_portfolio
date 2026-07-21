"use client";

import { Code, Globe, Mail, Share2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-12 bg-[#08090A]">
      {/* Curved Yellow Arch Footer Container */}
      <div className="max-w-6xl mx-auto bg-[#E5FE00] text-[#0B0C0E] rounded-t-3xl md:rounded-footer-arch px-6 sm:px-12 pt-14 pb-8 shadow-2xl">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-[#0B0C0E]/15">
          <div className="max-w-md">
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center font-black text-base">
                ✦
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#0B0C0E]">
                nivi.
              </span>
            </a>
            <p className="text-sm font-medium text-[#0B0C0E]/80 leading-relaxed">
              We partner with ambitious brands, fast-growing startups, and visionary founders to craft digital experiences that convert, scale, and stand out.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[Globe, Code, Mail, Share2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#0B0C0E] text-[#E5FE00] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
                aria-label="Social Icon"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 text-sm">
          {/* Services Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <li><a href="#services" className="hover:underline">Brand Identity</a></li>
              <li><a href="#services" className="hover:underline">UI/UX Design</a></li>
              <li><a href="#services" className="hover:underline">Web Development</a></li>
              <li><a href="#services" className="hover:underline">Motion Graphics</a></li>
              <li><a href="#services" className="hover:underline">Creative Strategy</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <li><a href="#hero" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#services" className="hover:underline">Our Services</a></li>
              <li><a href="#team" className="hover:underline">Meet Our Team</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Let's Connect
            </h4>
            <div className="flex flex-col gap-2.5 font-semibold text-[#0B0C0E]/80">
              <a href="mailto:hello@nivi-portfolio.com" className="hover:underline flex items-center gap-1">
                <span>hello@nivi-portfolio.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p>+1 (555) 234-5678</p>
              <p>Available for Q3/Q4 Projects</p>
            </div>
          </div>

          {/* Location Column */}
          <div>
            <h4 className="font-black text-base text-[#0B0C0E] uppercase tracking-wider mb-4">
              Locations
            </h4>
            <div className="flex flex-col gap-2 font-semibold text-[#0B0C0E]/80">
              <p>Austin, TX — Headquarters</p>
              <p>San Francisco, CA — Design Studio</p>
              <p>London, UK — Engineering Hub</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0B0C0E]/15 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-[#0B0C0E]/70 gap-4">
          <p>© 2026 Nivi Agency. All rights reserved. Designed with purpose.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
