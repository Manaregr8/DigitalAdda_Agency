'use client';

import { ArrowRight, Bot, Zap, Brain, BarChart3, Sparkles, Globe, Target } from 'lucide-react';

const trends = [
  {
    number: '01',
    title: 'AI-Driven Marketing Evolution',
    desc: 'From predictive analytics to automated customer journeys, AI is transforming the way businesses attract, engage, and convert customers. DigitalAdda empowers brands with intelligent insights, personalization, and performance-driven strategies.',
    icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-purple-600 to-pink-600',
  },
  {
    number: '02',
    title: 'VR-Powered Customer Experiences',
    desc: 'VR is redefining how customers interact with products and services. We help businesses create immersive experiences that increase trust, engagement, and sales.',
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-cyan-800 to-blue-800',
  },
  {
    number: '03',
    title: 'Hyper-Personalization at Scale',
    desc: 'Customers expect tailored experiences everywhere. Our AI engines track customer behavior and deliver real-time personalized content across platforms.',
    icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-emerald-600 to-teal-600',
  },
  {
    number: '04',
    title: 'Digital-First Consumer Behavior',
    desc: 'Online discovery and buying are now the norm. DigitalAdda builds strong digital footprints that turn searches into loyal customers.',
    icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-indigo-700 to-indigo-900',
  },
  {
    number: '05',
    title: 'Data-Backed Decision Making',
    desc: 'Data is the new currency of growth. We provide deep analytics, insights, and forecasting to help businesses make profitable choices.',
    icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-violet-600 to-purple-600',
  },
  {
    number: '06',
    title: 'Content Automation & Smart Branding',
    desc: 'Brands are scaling faster using intelligent content generation and automation tools. We make your brand visible, consistent, and future-ready.',
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-pink-600 to-rose-600',
  },
  {
    number: '07',
    title: 'Multi-Platform Digital Dominance',
    desc: 'From Google to Insta, from Meta Ads to AI-driven SEO— DigitalAdda ensures your business remains everywhere your customers are.',
    icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-indigo-600 to-blue-600',
  },
   {
    number: '08',
    title: 'Conversion Rate Optimization (CRO)',
    desc: 'AI heatmaps, A/B testing, and behavioral analysis turn website visitors into loyal paying customers.',
    icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
    linear: 'from-indigo-600 to-blue-600',
  }
];

export default function Homesection4() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden bg-linear-to-br from-[#0f0020] via-[#1a0033] to-[#0f0f1e]">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-800/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-800/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Header */}
        <p className="text-purple-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-2 sm:mb-3">
          Unveiling Tomorrow's Big Trends
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 sm:mb-4">
          MEGA TRENDS
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
          by DigitalAdda Agency
        </p>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-4xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
          Step into the future with DigitalAdda Agency as we decode the Mega Trends shaping the next era of business, marketing, and customer experience. Powered by AI, VR, and data-driven innovation, we help brands stay ahead—not just by following trends, but by creating them.
        </p>
        <div className="w-24 sm:w-32 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/80" />

        {/* Trends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {trends.map((trend) => (
            <div
              key={trend.number}
              className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-purple-500/30
                         hover:border-purple-400 hover:bg-white/10 transition-all duration-500 cursor-pointer
                         shadow-2xl hover:shadow-purple-500/20"
            >
              {/* linear Hover Overlay */}
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                            bg-linear-to-br ${trend.linear} blur-xl -z-10`}
              />

              {/* Number + Icon Badge */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  {trend.number}
                </span>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br ${trend.linear} p-2 sm:p-3 shadow-lg 
                              shadow-purple-500/50 flex items-center justify-center text-white`}
                >
                  {trend.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                {trend.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-4">
                {trend.desc}
              </p>

              {/* Arrow */}
              <div className="flex justify-end">
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 group-hover:text-pink-400 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}