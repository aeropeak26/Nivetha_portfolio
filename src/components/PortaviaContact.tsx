"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Code, Mail, Share2, Send, CheckCircle2 } from "lucide-react";

export default function PortaviaContact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer id="contact" className="py-24 px-4 bg-[#FFFFFF] dark:bg-[#0B0C0E] transition-colors border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Portrait Column with Floating Hand Badge (As seen in video 00:26 - 00:29) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/duncan_portrait.png"
                alt="Duncan Robert Contact Portrait"
                fill
                className="object-cover"
              />

              {/* Interactive Floating Badge (Video 00:27) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-[#6366F1] dark:bg-[#A3E635] text-white dark:text-black flex flex-col items-center justify-center font-bold shadow-lg border-2 border-white dark:border-gray-900 cursor-pointer text-xs"
              >
                <span>Hi</span>
                <span className="text-[10px]">🖐️</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Lead Capture Form (As seen in video 00:26 - 00:29) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter font-display leading-tight">
              LET'S WORK TOGETHER
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg">
              Let's build something impactful together — whether it's your brand, your website, or your next big idea.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-3xl bg-[#6366F1]/10 dark:bg-[#A3E635]/10 border border-[#6366F1]/30 dark:border-[#A3E635]/30 text-black dark:text-white flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#6366F1] dark:text-[#A3E635] shrink-0" />
                <p className="text-xs sm:text-sm font-bold">
                  Thank you! Your inquiry has been sent. Duncan will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-[#6366F1] dark:focus:border-[#A3E635] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="johnsmith@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-[#6366F1] dark:focus:border-[#A3E635] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Service Needed ?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-[#6366F1] dark:focus:border-[#A3E635] transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="ui_ux">UI / UX Design</option>
                    <option value="web_design">Web Design & Development</option>
                    <option value="branding">Brand Identity & Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    What Can I Help You...
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hello, I'd like to enquire about..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-[#6366F1] dark:focus:border-[#A3E635] transition-colors"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all active:scale-95 shadow-md"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>

        {/* Bottom Footer Details (Video 00:26) */}
        <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-600 dark:text-gray-400 font-medium">
          <div>
            <span>Email :</span>
            <p className="font-extrabold text-black dark:text-white text-sm mt-0.5">designer@example.com</p>
          </div>
          <div>
            <span>Call Today :</span>
            <p className="font-extrabold text-black dark:text-white text-sm mt-0.5">+1 (555) 123-4567</p>
          </div>
          <div className="sm:text-right">
            <span>Social :</span>
            <div className="flex sm:justify-end gap-3 mt-1 text-black dark:text-white font-bold">
              <a href="#" className="hover:text-[#6366F1] dark:hover:text-[#A3E635]">X</a>
              <a href="#" className="hover:text-[#6366F1] dark:hover:text-[#A3E635]">Instagram</a>
              <a href="#" className="hover:text-[#6366F1] dark:hover:text-[#A3E635]">Dribbble</a>
              <a href="#" className="hover:text-[#6366F1] dark:hover:text-[#A3E635]">Behance</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
