"use client";

export default function MarqueeBanner() {
  const words = [
    "Creativity",
    "Excellence",
    "Reliability",
    "Innovation",
    "Performance",
    "Strategy",
  ];

  return (
    <div className="py-5 bg-[#E5FE00] text-[#0B0C0E] overflow-hidden select-none border-y border-black/10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-black text-2xl md:text-4xl tracking-tight uppercase">
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span key={index} className="flex items-center gap-8">
            <span>{word}</span>
            <span className="text-xl md:text-2xl text-[#0B0C0E] opacity-70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
