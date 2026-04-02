'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Rohit Sharma',
    role: 'Business Owner',
    content: '"Working with DigitalAdda Agency has been one of the best decisions for my business..."',
    rating: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Founder, Fashion Brand',
    content: '"DigitalAdda Agency completely transformed our online presence..."',
    rating: 5,
  },
  {
    name: 'Aman Verma',
    role: 'Real Estate Consultant',
    content: '"I was struggling with online lead generation before working with DigitalAdda Agency..."',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Clinic Owner',
    content: '"DigitalAdda Agency helped my clinic grow digitally..."',
    rating: 5,
  },
  {
    name: 'Karan Singh',
    role: 'Startup Founder',
    content: '"As a startup, we needed a reliable digital marketing partner..."',
    rating: 5,
  },
];

// Split testimonials
const rowOne = testimonials.filter((_, i) => i % 2 === 0);
const rowTwo = testimonials.filter((_, i) => i % 2 === 1);

// Marquee Row Component
function MarqueeRow({ items, duration = 38 }) {
  const track = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full relative">
      {/* Fade */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0f0020, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0f0020, transparent)" }} />

      <div
        className="flex gap-6 w-max"
        style={{ animation: `testimonial-marquee ${duration}s linear infinite` }}
      >
        {track.map((t, i) => (
          <div key={i} className="shrink-0 px-2 md:px-4" style={{ width: '380px' }}>
            <div className="p-7 rounded-2xl bg-white/5 backdrop-blur-xl border border-purple-500/30 h-full flex flex-col">

              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-200 text-sm italic flex-1">
                {t.content}
              </p>

              {/* Name */}
              <div className="text-center">
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-purple-300 text-sm">{t.role}</p>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1">
                {[...Array(t.rating)].map((_, idx) => (
                  <span key={idx}>⭐</span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MAIN COMPONENT
export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f0020]">

      {/* Animation */}
      <style>{`
        @keyframes testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Header */}
        <h2 className="text-4xl font-bold text-white">
          Satisfied Clients
        </h2>

        <p className="text-gray-400">
          Hear from our clients about their real business growth.
        </p>

        {/* Marquee */}
        <div className="flex flex-col gap-7">
          <MarqueeRow items={rowOne} duration={38} />
          <MarqueeRow items={rowTwo} duration={32} />
        </div>

      </div>
    </section>
  );
}