"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqsData as fallbackFaqs, FaqItem } from "@/data/faqsData";

export default function PortaviaFaq() {
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [openId, setOpenId] = useState<number>(1);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch("/api/faqs");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setFaqs(json.data);
        }
      } catch (e) {
        console.error("Failed to load FAQs", e);
      }
    }
    loadFaqs();
  }, []);

  return (
    <section className="py-24 px-4 bg-[#F8F9FA] text-[#0F1115] border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Title Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              ✦ FREQUENTLY ASKED
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0F1115] uppercase tracking-tighter font-display leading-tight mt-1">
              QUESTIONS & ANSWERS
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Common questions about my design process, project timelines, deliverables, and collaboration workflow.
            </p>
          </div>

          {/* Right Accordion Q&A Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? 0 : faq.id)}
                    className="w-full flex items-center justify-between py-2 text-left group"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold uppercase font-display tracking-tight transition-colors ${
                        isOpen ? "text-indigo-600" : "text-[#0F1115] group-hover:text-indigo-600"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-indigo-600" : "text-gray-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pr-6"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
