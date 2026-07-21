"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Globe, Code, Share2 } from "lucide-react";

export default function PortaviaContact() {
  return (
    <footer id="contact" className="py-20 px-4 bg-[#F8F9FA] dark:bg-[#090A0F] border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Badge */}
        <span className="px-3.5 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
          ✦ HAVE A PROJECT IN MIND?
        </span>

        {/* Big Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white tracking-tight leading-tight">
          Let's Build Something <br />
          <span className="text-[#6366F1] dark:text-indigo-400">Extraordinary.</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md font-medium">
          Available for select freelance projects, digital design consulting, and Framer development.
        </p>

        {/* Email CTA Button */}
        <motion.a
          href="mailto:hello@duncanrobert.com"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm sm:text-base shadow-xl flex items-center gap-3 group"
        >
          <Mail className="w-5 h-5 text-[#6366F1] dark:text-indigo-600" />
          <span>hello@duncanrobert.com</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>

        {/* Social Links */}
        <div className="mt-12 flex items-center gap-4">
          {[
            { label: "Website", icon: Globe },
            { label: "Code", icon: Code },
            { label: "Share", icon: Share2 },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href="#"
                className="w-11 h-11 rounded-full bg-white dark:bg-[#13161F] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] transition-all shadow-sm"
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200/60 dark:border-gray-800/60 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© 2026 Duncan Robert (Portavia Template). All rights reserved.</p>
          <p className="font-medium">Designed with precision in Framer & Next.js</p>
        </div>

      </div>
    </footer>
  );
}
