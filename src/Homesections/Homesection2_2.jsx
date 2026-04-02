"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const brands = [
  { id: 1,  name: "Blumera",                     src: "/brands/1.png"  },
  { id: 2,  name: "CUET-Adda",                   src: "/brands/2.png"  },
  { id: 3,  name: "DesigningVidya",              src: "/brands/3.png"  },
  { id: 4,  name: "DigitalAdda",                 src: "/brands/4.png"  },
  { id: 5,  name: "Digiwarms",                   src: "/brands/5.png"  },
  { id: 6,  name: "DigitalAdda II",              src: "/brands/6.png"  },
  { id: 7,  name: "Economics With Gulshan Sir",  src: "/brands/7.png"  },
  { id: 8,  name: "FACT Education",              src: "/brands/8.png"  },
  { id: 9,  name: "Hacking Vidya",               src: "/brands/9.png"  },
  { id: 10, name: "IIDAD",                       src: "/brands/10.png" },
  { id: 11, name: "LawPrep",                     src: "/brands/11.png" },
  { id: 12, name: "Legal Adda",                  src: "/brands/12.png" },
  { id: 13, name: "NIDADS",                      src: "/brands/13.png" },
  { id: 14, name: "NIFASE",                      src: "/brands/14.png" },
  { id: 15, name: "NIGAPE",                      src: "/brands/15.png" },
  { id: 16, name: "NIHACS",                      src: "/brands/16.png" },
  { id: 17, name: "NIMLACC",                     src: "/brands/17.png" },
  { id: 18, name: "Shalini Vashisht",            src: "/brands/18.png" },
];

const rowOne = brands.slice(0, 9);
const rowTwo = brands.slice(9);

/* ── Single infinite-scroll row ── */
function MarqueeRow({ items, duration = 32 }) {
  // Triplicate so there's always content visible while scrolling
  const track = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full relative">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to right, #08001a, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to left, #08001a, transparent)" }} />

      <div
        className="flex gap-4 sm:gap-6 w-max"
        style={{ animation: `da-marquee ${duration}s linear infinite` }}
      >
        {track.map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="flex-shrink-0 w-[110px] sm:w-[130px] md:w-[150px] h-[64px] sm:h-[72px] flex items-center justify-center bg-white/[0.025] border border-white/[0.07] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 px-5"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="w-full h-full object-contain brightness-75 hover:brightness-110 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#08001a]"
    >
      {/* CSS keyframe — injected once */}
      <style>{`
        @keyframes da-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-purple-800/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-indigo-800/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="inline-block mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-5 py-1.5 bg-purple-500/10">
            Our Clients
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Brands That<br />
            <span className="text-purple-300">Chose to Grow With Us</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From early-stage startups to established category leaders — these are the
            businesses that trusted us with their growth.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </motion.div>

      </div>

      {/* ── Marquee Rows — full bleed, no horizontal padding ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="flex flex-col gap-4 sm:gap-5"
      >
        {/* Row 1 — 32 s */}
        <MarqueeRow items={rowOne} duration={32} />

        {/* Row 2 — 26 s (slightly faster for depth) */}
        <MarqueeRow items={rowTwo} duration={26} />
      </motion.div>

      {/* ── Footer note ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.55 }}
        className="mt-10 sm:mt-12 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-purple-600 px-4"
      >
        200+ brands served &nbsp;&middot;&nbsp; 8+ years &nbsp;&middot;&nbsp; 95% retention
      </motion.p>
    </section>
  );
}