"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, CheckCircle, Sparkles } from "lucide-react";

export default function CtaContactSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-[#08090A]">
      <div className="max-w-6xl mx-auto bg-[#131518] border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Lead Form Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5FE00] text-[#0B0C0E] text-xs font-black uppercase tracking-wider mb-6">
              ✦ Let's Collaborate
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Ready to Elevate <br />
              <span className="text-[#E5FE00]">Your Brand?</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 font-medium max-w-lg leading-relaxed">
              We are accepting new projects for Q3/Q4. Tell us about your goals and let's create something truly extraordinary.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 rounded-2xl bg-[#E5FE00]/10 border border-[#E5FE00]/30 text-[#E5FE00] flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 shrink-0" />
                <span className="font-bold text-sm">
                  Thank you! Your message has been received. We will contact you within 24 hours.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#E5FE00] transition-colors text-sm flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#E5FE00] text-[#0B0C0E] font-black text-sm hover:bg-[#D4F82C] hover:shadow-[0_0_20px_rgba(229,254,0,0.4)] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span>Get In Touch</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-8 flex items-center gap-6 text-xs text-gray-400 font-medium">
              <span>✓ Fast response (24h)</span>
              <span>✓ No pushy sales</span>
              <span>✓ Free quote</span>
            </div>
          </div>

          {/* Right Showcase Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/hero_portrait.png"
                alt="Nivi Agency Contact Portrait"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B0C0E]/80 backdrop-blur-md border border-white/10 text-white">
                <p className="text-xs font-bold text-[#E5FE00] uppercase tracking-wider">Direct Line</p>
                <p className="text-sm font-semibold mt-1">hello@nivi-portfolio.com</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
