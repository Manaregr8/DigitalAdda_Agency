"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  { id: 1, name: "Blumera", src: "/brands/1.png" },
  { id: 2, name: "CUET-Adda", src: "/brands/2.png" },
  { id: 3, name: "DesigningVidya", src: "/brands/3.png" },
  { id: 4, name: "DigitalAdda", src: "/brands/4.png" },
  { id: 5, name: "Digiwarms", src: "/brands/5.png" },
  { id: 6, name: "DigitalAdda II", src: "/brands/6.png" },
  { id: 7, name: "Economics With Gulshan Sir", src: "/brands/7.png" },
  { id: 8, name: "FACT Education", src: "/brands/8.png" },
  { id: 9, name: "Hacking Vidya", src: "/brands/9.png" },
  { id: 10, name: "IIDAD", src: "/brands/10.png" },
  { id: 11, name: "LawPrep", src: "/brands/11.png" },
  { id: 12, name: "Legal Adda", src: "/brands/12.png" },
  { id: 13, name: "NIDADS", src: "/brands/13.png" },
  { id: 14, name: "NIFASE", src: "/brands/14.png" },
  { id: 15, name: "NIGAPE", src: "/brands/15.png" },
  { id: 16, name: "NIHACS", src: "/brands/16.png" },
  { id: 17, name: "NIMLACC", src: "/brands/17.png" },
  { id: 18, name: "Shalini Vashisht", src: "/brands/18.png" },
];

export default function BrandShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
    hover: {
      scale: 1.05,
      y: -4,
      boxShadow: "0 8px 32px rgba(188, 62, 201, 0.25)",
      transition: { duration: 0.25 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #0f0020 0%, transparent 40%), radial-gradient(circle at bottom right, #0f0f1e 0%, #020617 100%)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-1/4 w-72 h-72 rounded-full bg-indigo-600/8 opacity-10 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-purple-600/10 opacity-15 blur-3xl" />
      </div>

      <div className="max-w-[1350px] mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trusted by Ambitious Brands
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            We partner with visionary teams to build scalable, high-impact solutions.
          </p>
        </motion.div>

        {/* Brand Grid – Zero Padding Around Logos */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              whileHover="hover"
              className="group flex items-center justify-center rounded-xl bg-white/3 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_8px_32px_rgba(120,119,198,0.2)]"
            >
              {/* ZERO PADDING — Logo fills entire card */}
              <img
                src={brand.src}
                alt={brand.name}
                className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-300 ease-out"
                // Optional: if logos are vector-based or need crisp edges
                style={{ imageRendering: 'optimizeQuality' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}