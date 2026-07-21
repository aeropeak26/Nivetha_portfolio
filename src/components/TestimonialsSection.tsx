"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Moore",
    role: "Tech Co-Founder, Veloce AI",
    text: "Working with Nivi felt like unlocking a secret superpower for our brand. They understood our technical requirements immediately and delivered an incredible Next.js app ahead of schedule.",
    image: "/images/hero_portrait.png",
    rating: 5,
  },
  {
    name: "Aisha Bello",
    role: "Marketing Manager, Apex Ventures",
    text: "The brand identity and motion animations completely elevated our pitch decks and web conversion rates. Their attention to detail and polish is truly world-class.",
    image: "/images/agency_workspace.png",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    role: "VP of Product, Nova Systems",
    text: "Rarely do you find an engineering partner that understands aesthetics as deeply as performant architecture. Nivi delivered excellence across every touchpoint.",
    image: "/images/hero_portrait.png",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 md:px-6 bg-[#0B0C0E]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4">
            ✦ Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Trusted By Industry Leaders
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-[#131518] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-8"
            >
              {/* Client Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-[#E5FE00]/40 shadow-xl">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quote Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 text-[#E5FE00] mb-4">
                  {"★".repeat(active.rating)}
                </div>

                <p className="text-base sm:text-xl text-gray-200 font-medium italic leading-relaxed">
                  "{active.text}"
                </p>

                <div className="mt-6">
                  <h4 className="text-lg font-black text-white">
                    {active.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E5FE00] font-semibold mt-0.5">
                    {active.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-[#E5FE00]" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/5 hover:bg-[#E5FE00] hover:text-[#0B0C0E] transition-all text-white border border-white/10"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/5 hover:bg-[#E5FE00] hover:text-[#0B0C0E] transition-all text-white border border-white/10"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
