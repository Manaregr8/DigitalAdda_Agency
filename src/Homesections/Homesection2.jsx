"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PHOTOS = [
  { src: "group.jpeg",       alt: "Leadership Team",     label: "Strategic Leadership",  span: "col-span-2 md:col-span-2 md:row-span-2" },
  { src: "/dapic/1.webp",    alt: "Team Collaborate",    label: "Collaborative Spirit",  span: "col-span-1 md:row-span-1" },
  { src: "dapic/group4.jpeg",alt: "Growth Mindset",      label: "Growth Mindset",        span: "col-span-1 md:row-span-1" },
  { src: "dapic/9.webp",     alt: "Innovation Hub",      label: "Innovation Hub",        span: "col-span-1 md:row-span-1" },
  { src: "dapic/group3.webp",alt: "Global Perspective",  label: "Global Perspective",    span: "col-span-1 md:row-span-2" },
  { src: "/dapic/6.webp",    alt: "Client First",        label: "Client First",          span: "col-span-1 md:row-span-1" },
  { src: "/dapic/3.webp",    alt: "Team Retreat",        label: "Team Retreat",          span: "col-span-1 md:row-span-1" },
  { src: "/dapic/7.webp",    alt: "Design Studio",       label: "Design Studio",         span: "col-span-1 md:row-span-1" },
];

export default function ConsultingServices() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden bg-[#08001a]"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-purple-800/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-indigo-800/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="inline-block mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-5 py-1.5 bg-purple-500/10">
            Our People
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Our Space, Our Team,
            <br />
            <span className="text-purple-300">Our Culture</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Behind every campaign is a team that genuinely cares — driven by curiosity,
            fuelled by craft, and committed to results that last.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </motion.div>

        {/* ── Photo Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:auto-rows-[220px] lg:auto-rows-[260px]">
            {PHOTOS.map(({ src, alt, label, span }, i) => (
              <motion.div
                key={alt}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                className={`${span} relative overflow-hidden border border-white/[0.07] group aspect-square md:aspect-auto hover:border-purple-500/40 transition-colors duration-300`}
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                {/* Bottom label bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 bg-black/50 border-t border-white/[0.07] flex items-center gap-2">
                  {/* Small accent dot */}
                  <div className="w-1 h-1 bg-purple-400 rotate-45 flex-shrink-0" />
                  <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] truncate">
                    {label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.55 }}
          className="mt-10 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-purple-600"
        >
          New Delhi &nbsp;&middot;&nbsp; A team that grows with you
        </motion.p>

      </div>
    </section>
  );
}
