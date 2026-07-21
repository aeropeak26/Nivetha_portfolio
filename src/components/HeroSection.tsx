"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Star, Sparkles } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-3 md:px-6 overflow-hidden bg-[#08090A]"
    >
      {/* Light Arch Hero Container */}
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#F7F8FA] to-[#EAECEF] text-[#0B0C0E] rounded-3xl md:rounded-hero-arch px-6 pt-12 md:pt-16 pb-0 relative shadow-2xl overflow-hidden">
        
        {/* Yellow Star Icon - Top Left */}
        <motion.div
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-8 left-8 md:top-12 md:left-14 text-[#E5FE00] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-[#0B0C0E] rounded-2xl shadow-lg"
        >
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 fill-[#E5FE00]" />
        </motion.div>

        {/* Floating Rating Badge - Top Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 right-8 md:top-12 md:right-14 bg-[#0B0C0E]/5 backdrop-blur-md border border-[#0B0C0E]/10 p-3 md:p-4 rounded-2xl flex flex-col items-start gap-1 shadow-sm"
        >
          <div className="flex gap-1 text-[#E5FE00] bg-[#0B0C0E] px-2 py-0.5 rounded-full text-xs font-bold">
            {"★".repeat(5)}
          </div>
          <span className="font-extrabold text-xl md:text-2xl text-[#0B0C0E] leading-none mt-1">
            10+ Years
          </span>
          <span className="text-xs text-gray-600 font-medium">Experience</span>
        </motion.div>

        {/* Main Header Content */}
        <motion.div
          style={{ y: textY }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center pt-8 md:pt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0C0E]/10 text-xs md:text-sm font-semibold tracking-wide text-[#0B0C0E] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#0B0C0E] animate-ping" />
            Empowering Next-Gen Brands
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0B0C0E] leading-[1.08] max-w-4xl"
          >
            Empowering Brands <br className="hidden sm:inline" />
            Through <span className="underline decoration-[#E5FE00] decoration-wavy decoration-4">Creative</span> Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl font-medium leading-relaxed"
          >
            nivi. is a full-service creative agency and engineering studio. We craft high-impact websites, brand systems, and interactive digital products designed for growth.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full bg-[#E5FE00] text-[#0B0C0E] font-extrabold text-sm md:text-base shadow-lg hover:bg-[#D4F82C] hover:shadow-[0_0_25px_rgba(229,254,0,0.5)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <a
              href="#services"
              className="px-7 py-3.5 rounded-full bg-[#0B0C0E] text-white font-bold text-sm md:text-base hover:bg-[#1E2126] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Work</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Arch Portrait Section */}
        <motion.div
          style={{ y: portraitY }}
          className="mt-12 md:mt-16 relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-t-[40px] shadow-2xl border-t border-l border-r border-white/40"
        >
          <Image
            src="/images/hero_portrait.png"
            alt="Nivi Agency Founder Portrait"
            fill
            priority
            className="object-cover object-top hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
