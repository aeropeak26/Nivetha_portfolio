"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortaviaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Blogs", href: "#blogs" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4">
      <nav
        className={`max-w-xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-[#11131A]/80 backdrop-blur-md shadow-lg border border-gray-200/80 dark:border-gray-800/80 py-2 px-3"
            : "bg-white/90 dark:bg-[#11131A]/90 backdrop-blur-sm shadow-md border border-gray-200 dark:border-gray-800 py-2.5 px-4"
        } flex items-center justify-between`}
      >
        {/* Left Avatar Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            <Image
              src="/images/duncan_portrait.png"
              alt="Duncan Robert"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </a>

        {/* Center Nav Links */}
        <ul className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Contact Button */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 active:scale-95 shadow-sm"
        >
          Contact
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-gray-700 dark:text-gray-200"
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
            className="sm:hidden fixed inset-x-6 top-20 bg-white dark:bg-[#11131A] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl z-50"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 transition-colors py-2 border-b border-gray-100 dark:border-gray-800"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
