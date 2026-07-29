"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profileData";

export default function PortaviaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const getHref = (hash: string) => {
    if (hash === "/projects") return "/projects";
    if (isHome) return hash;
    return `/${hash}`;
  };

  const navLinks = [
    { label: "Home", href: getHref("#hero") },
    { label: "About", href: getHref("#about") },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: getHref("#services") },
    { label: "Contact", href: getHref("#contact") },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-4 flex flex-col items-center pointer-events-none">
      
      {/* Floating Header Capsule */}
      <nav
        className={`pointer-events-auto max-w-3xl w-full mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 py-2 px-3.5 sm:px-5"
            : "bg-white/90 backdrop-blur-md shadow-md border border-gray-200/80 py-2.5 px-4 sm:px-6"
        } flex items-center justify-between`}
      >
        {/* Left Avatar, Name & Status */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-indigo-100 shadow-sm shrink-0 bg-indigo-50">
            <Image
              src={profileData.avatar}
              alt={profileData.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Green status pulse dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-extrabold text-[#0F1115] group-hover:text-indigo-600 transition-colors leading-tight">
              {profileData.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-none mt-0.5 flex items-center gap-1">
              <span>UI/UX Designer</span>
              <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide text-gray-700">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/projects"
                ? pathname.startsWith("/projects")
                : pathname === "/" && link.href === "#hero";

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600 font-extrabold"
                      : "hover:text-black text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Contact Button & Status Pill (Desktop only) */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Hire
          </span>

          <Link
            href={getHref("#contact")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0F1115] text-white text-xs font-bold hover:bg-indigo-600 transition-all duration-200 active:scale-95 shadow-sm"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-800 hover:text-indigo-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="pointer-events-auto md:hidden fixed inset-x-4 top-16 bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl z-50"
          >
            <div className="flex flex-col gap-4 text-center">
              <div className="inline-flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mx-auto mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Hire
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-gray-800 hover:text-indigo-600 transition-colors py-2 border-b border-gray-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={getHref("#contact")}
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3.5 rounded-full bg-[#0F1115] text-white font-bold text-sm uppercase tracking-wider"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
