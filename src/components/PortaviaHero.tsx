"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Layers, Paintbrush, Palette, Compass } from "lucide-react";

export default function PortaviaHero() {
  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 px-4 flex flex-col justify-center items-center relative overflow-hidden bg-white text-[#0F1115]">
      
      {/* Floating Design Tool Icons / Badges in Empty Spaces */}
      
      {/* 1. Figma Floating Badge (Top Left) */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-4 sm:left-12 lg:left-20 z-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-black">
          ❖
        </div>
        <span>Figma Expert</span>
      </motion.div>

      {/* 2. Adobe Tools Floating Badge (Mid Left) */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-36 left-6 sm:left-16 lg:left-24 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-6 h-6 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-black">
          Ai
        </div>
        <span>Adobe Creative Suite</span>
      </motion.div>

      {/* 3. Framer Floating Badge (Top Right) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-36 right-4 sm:right-12 lg:right-20 z-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs">
          ⚡
        </div>
        <span>Framer Developer</span>
      </motion.div>

      {/* 4. Dribbble Floating Badge (Mid Right) */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-44 right-6 sm:right-16 lg:right-24 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-600 flex items-center justify-center font-black text-xs">
          🏀
        </div>
        <span>Dribbble Pro</span>
      </motion.div>

      {/* 5. Canva Floating Badge (Bottom Center Left) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-16 left-1/4 z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg text-[11px] font-bold text-gray-700"
      >
        <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
          🎨
        </div>
        <span>Canva Assets</span>
      </motion.div>


      {/* Hero Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center my-auto relative z-10 px-2 sm:px-4">
        
        {/* Top Name Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gray-500 mb-6 font-sans"
        >
          DUNCAN ROBERT
        </motion.span>

        {/* Main Display Title Grid: DIGITAL [Portrait] DESIGNER */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 overflow-hidden">
          
          {/* Left Headline: DIGITAL (Sized responsively to fit 100% inside container) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-right shrink-0"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-bold tracking-tighter text-[#0F1115] uppercase leading-none font-display">
              DIGITAL
            </h1>
          </motion.div>

          {/* Center Portrait Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border border-gray-200 shrink-0 my-2 lg:my-0 group bg-[#F8F9FA]"
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
              className="absolute -bottom-2 -left-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-lg border-2 border-white text-lg sm:text-xl cursor-pointer hover:scale-110 transition-transform"
            >
              🖐️
            </motion.div>
          </motion.div>

          {/* Right Headline & Subtitle: DESIGNER (Sized responsively to fit 100% inside container) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start shrink-0"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-bold tracking-tighter text-[#0F1115] uppercase leading-none font-display">
              DESIGNER
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium max-w-xs leading-relaxed">
              I'm a US-based digital designer and Framer developer
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
