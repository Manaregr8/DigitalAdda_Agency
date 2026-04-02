"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import servicesData from "../../Data/services.json";

// ─── Reusable fade-in wrapper ──────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Arrow icon ────────────────────────────────────────────────────────────
function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Global ticker stats ───────────────────────────────────────────────────
const GLOBAL_STATS = [
  "200+ Brands Served",
  "95% Client Retention",
  "8+ Years of Excellence",
  "24/7 Dedicated Support",
  "500+ Campaigns Launched",
  "4.9 Average Rating",
];

export default function ServicePage({ params }) {
  const { slug } = React.use ? React.use(params) : params;
  const serviceName = servicesData.serviceSlugMap[slug];

  // ── 404 ───────────────────────────────────────────────────────────────────
  if (!serviceName) {
    return (
      <div className="min-h-screen bg-[#08001a] flex items-center justify-center">
        <div className="text-center border border-white/10 px-16 py-20">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 mb-6">
            Error 404
          </p>
          <h1 className="text-7xl font-black text-white mb-4">Not Found</h1>
          <p className="text-gray-500 text-lg">Service page does not exist.</p>
        </div>
      </div>
    );
  }

  const serviceData = servicesData.services[serviceName];
  const heroContent = serviceData.hero;
  const features = serviceData.features || [];
  const ctaText = serviceData.cta || "Get Started";

  return (
    <div className="min-h-screen bg-[#08001a] text-white overflow-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-5 pb-28 px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[140px]" />
        </div>

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-8">
              ✦ {serviceName}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight text-white mb-6">
              {heroContent.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-semibold text-purple-300 mb-5">
              {heroContent.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
              {heroContent.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <a
              href="/Contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 group"
            >
              {ctaText}
              <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </FadeIn>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS TICKER
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .ticker-track { animation: ticker 30s linear infinite; }
            .ticker-track:hover { animation-play-state: paused; }
          `
        }} />
        <div className="flex ticker-track whitespace-nowrap">
          {[...GLOBAL_STATS, ...GLOBAL_STATS].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center shrink-0 px-12 py-5 border-r border-white/[0.06] gap-4"
            >
              <span className="text-2xl font-black text-white">
                {item.split(" ")[0]}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500">
                {item.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURES — what's included
      ══════════════════════════════════════════════════════════════ */}
      {features.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Section header */}
            <FadeIn className="mb-16">
              <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
                What's Included
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Core Capabilities
              </h2>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-px w-16 bg-purple-600/40" />
                <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
                <div className="h-px w-16 bg-purple-600/40" />
              </div>
            </FadeIn>

            {/* Feature cards — editorial ruled grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {features.map((feature, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <div className="group relative p-8 sm:p-10 bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 h-full overflow-hidden">
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-300" />

                    {/* Watermark index */}
                    <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.05] transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon placeholder square */}
                    <div className="mb-6 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 transition-all duration-300">
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" strokeWidth={1.5}>
                        <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          HOW WE WORK — process steps
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-[#060012] border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              How We Work
            </h2>
          </FadeIn>

          <div className="space-y-px border border-white/[0.06] bg-white/[0.06]">
            {[
              { label: "Discovery", body: "We audit your current presence, study your competitors, and identify the highest-leverage opportunities specific to your business." },
              { label: "Strategy", body: "A tailored action plan is built around your goals, timeline, and budget — no cookie-cutter templates." },
              { label: "Execution", body: "Our certified specialists execute every deliverable with precision, keeping you informed at every milestone." },
              { label: "Reporting", body: "Real-time dashboards and detailed monthly reports give you full visibility into performance and ROI." },
              { label: "Optimisation", body: "We continuously A/B test, analyse data, and refine to compound results over time." },
            ].map((step, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="group flex items-start gap-8 p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden">
                  {/* Step number */}
                  <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 group-hover:text-purple-400 transition-colors pt-1 w-8 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                      {step.label}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {step.body}
                    </p>
                  </div>

                  <Arrow className="shrink-0 w-4 h-4 text-purple-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 mt-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST STATS ROW
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06] bg-[#08001a]">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white/[0.02] divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
            {[
              { value: "200+", label: "Brands Served" },
              { value: "95%", label: "Client Retention" },
              { value: "8+", label: "Years of Excellence" },
              { value: "24/7", label: "Dedicated Support" },
            ].map(({ value, label }, i) => (
              <div
                key={i}
                className="group px-8 py-10 text-center hover:bg-white/[0.03] transition-colors duration-300"
              >
                <p className="text-3xl sm:text-4xl font-black text-white mb-1.5 group-hover:text-purple-200 transition-colors duration-300">
                  {value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/20 rounded-full blur-[160px]" />
        </div>

        <FadeIn className="relative max-w-5xl mx-auto border border-white/[0.06] bg-white/[0.02] px-8 sm:px-14 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5 max-w-2xl">
            {/* Large quotation mark */}
            <svg
              viewBox="0 0 32 28"
              fill="none"
              className="w-10 h-10 flex-shrink-0 text-purple-600/60 mt-0.5"
              aria-hidden="true"
            >
              <path
                d="M0 28V17.333C0 7.778 4.444 2.222 13.333 0L15.556 3.556C11.556 4.889 9.111 7.333 8.222 10.889H13.333V28H0ZM18.667 28V17.333C18.667 7.778 23.111 2.222 32 0L34.222 3.556C30.222 4.889 27.778 7.333 26.889 10.889H32V28H18.667Z"
                fill="currentColor"
              />
            </svg>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                Ready to get started with{" "}
                <span className="text-purple-300">{serviceName}</span>?
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Let's build a strategy tailored to your goals — and built to deliver results from day one.
              </p>
            </div>
          </div>

          <a
            href="/Contact"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 group"
          >
            {ctaText}
            <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </FadeIn>
      </section>

    </div>
  );
}

