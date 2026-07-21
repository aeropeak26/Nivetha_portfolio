"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function PortaviaHero() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <section id="hero" className="min-h-screen pt-32 pb-16 px-4 flex flex-col justify-between items-center relative overflow-hidden">
      
      {/* Hero Container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center my-auto">
        
        {/* Top Name Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-6"
        >
          DUNCAN ROBERT
        </motion.span>

        {/* Main Display Title Grid: DIGITAL [Portrait] DESIGNER */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          
          {/* Left Headline: DIGITAL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-right"
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-black dark:text-white uppercase leading-none font-display">
              DIGITAL
            </h1>
          </motion.div>

          {/* Center Portrait Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 shrink-0 my-4 lg:my-0 group"
          >
            <Image
              src="/images/duncan_portrait.png"
              alt="Duncan Robert - Digital Designer"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Periwinkle Blue Floating Hand Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900 text-xl sm:text-2xl cursor-pointer hover:scale-110 transition-transform"
            >
              🖐️
            </motion.div>
          </motion.div>

          {/* Right Headline & Subtitle: DESIGNER */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-black dark:text-white uppercase leading-none font-display">
              DESIGNER
            </h1>
            <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium max-w-xs leading-relaxed">
              I'm a US-based digital designer and Framer developer
            </p>
          </motion.div>

        </div>
      </div>

      {/* Bottom Center Dark/Light Theme Toggle Switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 flex items-center justify-center"
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative inline-flex items-center h-8 rounded-full w-16 p-1 bg-gray-200 dark:bg-gray-800 transition-colors duration-300 shadow-inner"
          aria-label="Toggle Theme"
        >
          <span
            className={`w-6 h-6 rounded-full bg-white dark:bg-indigo-500 shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs ${
              darkMode ? "translate-x-8 text-white" : "translate-x-0 text-gray-700"
            }`}
          >
            {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </span>
        </button>
      </motion.div>

    </section>
  );
}
