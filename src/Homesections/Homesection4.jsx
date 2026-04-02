"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRENDS = [
  {
    number: "01",
    title: "AI-Driven Marketing Evolution",
    desc: "From predictive analytics to automated customer journeys, AI is transforming how businesses attract, engage, and convert. We empower brands with intelligent insights and performance-driven strategies that compound over time.",
    accent: "bg-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4zm0 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "VR-Powered Customer Experiences",
    desc: "VR is redefining how customers interact with products and services. We help businesses create immersive experiences that increase trust, deepen engagement, and accelerate purchase decisions.",
    accent: "bg-cyan-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="8" width="20" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15.5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Hyper-Personalization at Scale",
    desc: "Customers expect tailored experiences everywhere. Our systems track behaviour and deliver real-time personalised content across every platform — at scale, without the manual overhead.",
    accent: "bg-emerald-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 13c1.5.5 2.5 1.8 2.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Digital-First Consumer Behaviour",
    desc: "Online discovery and buying are the norm. DigitalAdda builds strong digital footprints — SEO, content, paid media — that turn searches and scrolls into loyal, repeat customers.",
    accent: "bg-indigo-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12h20M12 2c-2.5 3-4 6-4 10s1.5 7 4 10M12 2c2.5 3 4 6 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Data-Backed Decision Making",
    desc: "Data is the new currency of growth. We provide deep analytics, real-time reporting, and forward-looking forecasts that let you make profitable decisions — confidently and quickly.",
    accent: "bg-violet-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <path d="M4 20V14M8 20V10M12 20V4M16 20V12M20 20V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "06",
    title: "Content Automation & Smart Branding",
    desc: "Brands are scaling faster using intelligent content generation and automation. We make your brand visible, consistent, and future-proof across every channel and touchpoint.",
    accent: "bg-pink-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3L14.5 8.5H20.5L15.5 12L17.5 18L12 14.5L6.5 18L8.5 12L3.5 8.5H9.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "07",
    title: "Multi-Platform Digital Dominance",
    desc: "From Google to Instagram, Meta Ads to AI-driven SEO — DigitalAdda ensures your business remains present everywhere your customers are, with consistent messaging that converts.",
    accent: "bg-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    number: "08",
    title: "Conversion Rate Optimisation",
    desc: "Heatmaps, A/B testing, and behavioural analysis turn website visitors into paying customers. We make every click count — maximising the return on your existing traffic.",
    accent: "bg-orange-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
        <path d="M3 17l4-7 4 4 4-6 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 9l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// Arrow SVG used in each card
function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-purple-600 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Homesection4() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden bg-[#08001a]"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-purple-900/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-indigo-900/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="inline-block mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-5 py-1.5 bg-purple-500/10">
            Unveiling Tomorrow's Trends
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Mega Trends
            <br />
            <span className="text-purple-300">Shaping the Next Era</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We help brands stay ahead — not just by following trends, but by positioning
            themselves to lead in the next era of digital business.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </motion.div>

        {/* ── Trends grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
          {TRENDS.map(({ number, title, desc, accent, icon }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="group relative bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 p-7 sm:p-8 overflow-hidden flex flex-col gap-4"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-7 bottom-7 w-[3px] bg-purple-800/40 group-hover:bg-purple-500 transition-colors duration-400" />

              {/* Number + Icon row */}
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-white/[0.05] leading-none select-none group-hover:text-white/[0.08] transition-colors duration-300">
                  {number}
                </span>
                <div className={`w-9 h-9 flex items-center justify-center text-white ${accent} flex-shrink-0`}>
                  {icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-white text-sm sm:text-base font-bold leading-snug group-hover:text-purple-100 transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300 flex-1">
                {desc}
              </p>

              {/* Arrow */}
              <div className="flex justify-end pt-1">
                <Arrow />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.55 }}
          className="mt-10 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-purple-600"
        >
          DigitalAdda Agency &nbsp;&middot;&nbsp; Built for what comes next
        </motion.p>

      </div>
    </section>
  );
}

