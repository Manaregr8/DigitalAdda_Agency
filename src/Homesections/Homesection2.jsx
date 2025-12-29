"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ConsultingServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      // Fix: use proper gradient utility
      className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#0f0020] via-[#1a0033] to-[#0f0f1e]"
    >
      {/* Light background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 lg:gap-12 items-start">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center w-full"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Our Space
              </span>
              <br />
              <span className="text-white">Our Team, Our Culture</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-4 h-1 w-40 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full origin-left"
            />
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Your success, our expertise — partnering for growth and innovation at the highest level.
            </p>
          </motion.div>

          {/* Photo Frame Collage - Now Fully Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Responsive grid: 1 col (mobile) → 2 cols (sm) → 3 cols (md+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] lg:auto-rows-[280px]">
              
              {/* Top wide - full width on mobile, 2 cols on md+ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="col-span-1 sm:col-span-2 md:col-span-2 lg:row-span-2 row-span-1 relative rounded-br-[20px] rounded-tl-[20px] overflow-hidden shadow-2xl border border-white/8 group transform-gpu scale-[1.02] md:scale-[1.03] -translate-y-0 md:-translate-y-1 z-10 hover:scale-[1.04] hover:-translate-y-1"
              >
                <img
                  src="group.jpeg"
                  alt="Leadership Team"
                  loading="lazy"
                  className="w-full h-full object-cover object-bottom sm:object-center transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/20 backdrop-blur-sm">
                  <p className="text-white text-xs sm:text-sm font-medium">Strategic Leadership</p>
                </div>
              </motion.div>

              {/* Top right small */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.04 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="/dapic/1.webp"
                  alt="Top Right"
                  loading="lazy"
                  className="w-full h-full object-cover object-bottom transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Collaborative Spirit</p>
                </div>
              </motion.div>

              {/* Middle left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="dapic/group4.jpeg"
                  alt="Middle Left"
                  loading="lazy"
                  className="w-full h-full object-cover object-center-right transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Growth Mindset</p>
                </div>
              </motion.div>

              {/* Middle center */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="dapic/9.webp"
                  alt="Middle Center"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Innovation Hub</p>
                </div>
              </motion.div>

              {/* Right tall - only spans 2 rows on md+ */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="col-span-1 md:row-span-2 row-span-1 relative rounded-br-[20px] rounded-tl-[20px] overflow-hidden shadow-2xl border border-white/8 group transform-gpu hover:scale-103 hover:-translate-y-1"
              >
                <img
                  src="dapic/group3.webp"
                  alt="Right Tall"
                  loading="lazy"
                  className="w-full h-full object-cover object-bottom md:object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs sm:text-sm font-medium">Global Perspective</p>
                </div>
              </motion.div>

              {/* Bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.20 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="/dapic/6.webp"
                  alt="Bottom Left"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Client First</p>
                </div>
              </motion.div>

              {/* Bottom center */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="/dapic/3.webp"
                  alt="Bottom Center"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Team Retreat</p>
                </div>
              </motion.div>

              {/* Bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="col-span-1 row-span-1 relative rounded-br-[12px] rounded-tl-[12px] overflow-hidden shadow-md border border-white/6 group transform-gpu hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="/dapic/7.webp"
                  alt="Bottom Right"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white text-xs font-medium">Design Studio</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}