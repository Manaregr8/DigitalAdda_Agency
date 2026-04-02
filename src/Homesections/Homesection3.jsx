"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 500, label: "Successful Projects", suffix: "+", duration: 2000 },
  { value: 350, label: "Satisfied Clients",   suffix: "+", duration: 2000 },
  { value: 8,   label: "Years of Excellence", suffix: "+", duration: 1200 },
];

const BENEFITS = [
  {
    title: "Full Transparency",
    body:  "Real-time reporting dashboards and detailed monthly breakdowns — you always know exactly where your investment is working.",
  },
  {
    title: "Round-the-Clock Support",
    body:  "A dedicated team available 24/7 to answer questions, resolve issues, and keep your campaigns running without interruption.",
  },
  {
    title: "Multi-Channel Expertise",
    body:  "Proven mastery across SEO, paid search, social media, content strategy, and brand identity — all under one roof.",
  },
];

const CLIENTS = [
  "NIMLACC", "IIDAD", "NIGAPE", "NIDAD", "NIFASE",
  "DesigningVidya", "HackingVidya", "LawPrep", "FACT Education",
  "Blumera", "NIHACS", "CUET Adda", "DigitalAdda", "Digiwarms",
  "Legal Adda", "Economics with Gulshan Sir",
];

// ── CountUp stat ──────────────────────────────────────────────────────────────

function CountUpStat({ stat, isInView }) {
  const [display, setDisplay] = useState("0");
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / stat.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(stat.value * eased) + stat.suffix);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(stat.value + stat.suffix);
    };

    requestAnimationFrame(tick);
  }, [isInView, stat]);

  return (
    <div className="group px-8 py-8 text-center hover:bg-white/[0.03] transition-colors duration-300">
      <p className="text-3xl sm:text-4xl font-black text-white mb-1.5 group-hover:text-purple-200 transition-colors duration-300 tabular-nums">
        {display}
      </p>
      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
        {stat.label}
      </p>
    </div>
  );
}

// ── Arrow icon ────────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 flex-shrink-0 text-purple-500 mt-0.5" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function MarketIntelligenceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden bg-[#08001a]"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-800/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-800/8 rounded-full blur-[140px]" />
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
            Market Intelligence &amp; Growth
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Your Trusted
            <br />
            <span className="text-purple-300">Partner in Growth</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            At DigitalAdda Agency, every strategy is built around one obsession —
            real, compounding results that move your business forward.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-3 bg-white/[0.02] border border-white/[0.06] divide-x divide-white/[0.06] mb-12 sm:mb-14"
        >
          {STATS.map((stat) => (
            <CountUpStat key={stat.label} stat={stat} isInView={isInView} />
          ))}
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">

          {/* Left — benefits */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="bg-[#08001a] p-8 sm:p-10 space-y-6"
          >
            {/* Intro paragraph */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed border-l-[3px] border-purple-600 pl-5">
              At <span className="text-white font-semibold">DigitalAdda Agency</span> we deliver
              result-driven marketing strategies that help brands grow faster and smarter —
              with&nbsp;100% transparency, 24/7 support, and a 95% client satisfaction rate.
            </p>

            {/* Benefit cards */}
            <div className="space-y-px bg-white/[0.06]">
              {BENEFITS.map(({ title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="group bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 p-5 sm:p-6 flex gap-4"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <ArrowRight />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold mb-1 group-hover:text-purple-200 transition-colors duration-300">
                      {title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Unlock CTA block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 flex items-center gap-5"
            >
              {/* Lock SVG */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 flex-shrink-0 text-purple-500" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.25" fill="currentColor"/>
              </svg>
              <div>
                <p className="text-white font-bold text-sm sm:text-base leading-snug">
                  Unlock new opportunities
                </p>
                <p className="text-gray-500 text-sm mt-0.5">
                  with data-driven analysis tailored to your market.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — client names */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="bg-[#08001a] p-8 sm:p-10"
          >
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 mb-6">
              Trusted by Industry Leaders
            </p>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              {CLIENTS.map((client, i) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.04, duration: 0.35 }}
                  className="group bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 px-4 py-3 flex items-center gap-2.5"
                >
                  <div className="w-1 h-1 bg-purple-600 rotate-45 flex-shrink-0 group-hover:bg-purple-400 transition-colors duration-300" />
                  <span className="text-gray-400 text-xs sm:text-sm font-medium truncate group-hover:text-white transition-colors duration-300">
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

