'use client';
import { useState, useRef, useEffect } from 'react';


// Updated categories – only the names changed
const categories = [
  'StartUp Marketing',
  'Fashion Digital Marketing Agency',
  'Health Care Digital Marketing',
  'B2B Digital Marketing',
  'Education Digital Marketing',
  'Interior Designer Digital Marketing',
  'Real Estate Digital Marketing',
  'Tour & Travel Digital Marketing',
  'CA Digital Marketing',
  'Lawyer Digital Marketing',
  'EV Digital Marketing',
  'Finance Digital Marketing',
  'Construction Digital Marketing',
  'Manufacturing Digital Marketing',
  'Political Campaign Digital Marketing',
];

// Reports stay the same (you can replace the content later if you want different reports per industry)
const reportsByCategory = {
  'StartUp Marketing': [
    { title: 'Global Startup Ecosystem Report 2025 – Funding & Growth Trends', date: 'November 2025', price: '$2900' },
    { title: 'AI-Powered Startups Market Size, Share & Investment Analysis 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'SaaS Startup Valuation and Growth Strategies Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Fashion Digital Marketing Agency': [
    { title: 'Luxury Fashion E-Commerce Market Size & Trends 2025-2032', date: 'November 2025', price: '$2900' },
    { title: 'Sustainable Fashion & Apparel Industry Growth Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Direct-to-Consumer (D2C) Fashion Brands Market Analysis 2025', date: 'November 2025', price: '$2900' },
  ],
  'Health Care Digital Marketing': [
    { title: 'Digital Health & Telemedicine Market Size and Forecast 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'Healthcare Digital Advertising Spend & Trends Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Medical Devices & Wearables Market Growth Analysis 2025', date: 'November 2025', price: '$2900' },
  ],
  'B2B Digital Marketing': [
    { title: 'B2B Digital Marketing Trends and Budget Allocation Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Account-Based Marketing (ABM) Platforms Market Size 2025-2032', date: 'November 2025', price: '$2900' },
    { title: 'Industrial IoT and B2B Tech Buyer Behavior Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Education Digital Marketing': [
    { title: 'Online Education & EdTech Market Size and Forecast 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'K-12 and Higher Education Digital Enrollment Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Corporate Training & eLearning Platforms Market Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Interior Designer Digital Marketing': [
    { title: 'Home Decor & Interior Design Market Trends 2025-2030', date: 'November 2025', price: '$2900' },
    { title: 'Smart Home & Furniture E-Commerce Growth Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Luxury Interior Products and Services Market Analysis 2025', date: 'November 2025', price: '$2900' },
  ],
  'Real Estate Digital Marketing': [
    { title: 'Global Real Estate Tech (PropTech) Market Size 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'Residential & Commercial Property Digital Marketing Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Virtual Tours and Real Estate CRM Platforms Market Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Tour & Travel Digital Marketing': [
    { title: 'Online Travel Booking & OTA Market Size 2025-2032', date: 'November 2025', price: '$2900' },
    { title: 'Luxury & Adventure Tourism Digital Trends Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Post-Pandemic Travel Recovery and Marketing Strategies 2025', date: 'November 2025', price: '$2900' },
  ],
  'CA Digital Marketing': [
    { title: 'Chartered Accountancy & Financial Advisory Digital Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Tax Consulting and Compliance Software Market Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Wealth Management Client Acquisition Strategies 2025', date: 'November 2025', price: '$2900' },
  ],
  'Lawyer Digital Marketing': [
    { title: 'Legal Services Digital Marketing and SEO Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Law Firm CRM and Client Intake Platforms Market 2025', date: 'November 2025', price: '$2900' },
    { title: 'Personal Injury & Corporate Law Lead Generation Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'EV Digital Marketing': [
    { title: 'Electric Vehicle Market Size, Share & Growth Forecast 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'EV Charging Infrastructure and Consumer Trends Report 2025', date: 'November 2025', price: '$2900' },
    { title: 'Electric Two-Wheelers and Commercial EVs Market Analysis 2025', date: 'November 2025', price: '$2900' },
  ],
  'Finance Digital Marketing': [
    { title: 'FinTech and Digital Banking Market Growth Report 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'Personal Finance Apps and WealthTech Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Crypto & Blockchain Investment Marketing Strategies 2025', date: 'November 2025', price: '$2900' },
  ],
  'Construction Digital Marketing': [
    { title: 'Construction Tech (ConTech) Market Size and Forecast 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'Green Building and Sustainable Construction Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Prefabricated & Modular Construction Market Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Manufacturing Digital Marketing': [
    { title: 'Industry 4.0 and Smart Manufacturing Market Report 2025-2035', date: 'November 2025', price: '$2900' },
    { title: 'Industrial IoT and Automation Adoption Trends 2025', date: 'November 2025', price: '$2900' },
    { title: 'Additive Manufacturing (3D Printing) in Industry Report 2025', date: 'November 2025', price: '$2900' },
  ],
  'Political Campaign Digital Marketing': [
    { title: 'Digital Political Advertising Spend and Trends 2025-2028', date: 'November 2025', price: '$2900' },
    { title: 'Voter Targeting and Micro-Targeting Platforms Market 2025', date: 'November 2025', price: '$2900' },
    { title: 'Social Media Influence on Elections and Campaigns Report 2025', date: 'November 2025', price: '$2900' },
  ],
};

const packageTiers = [
  {
    name: "Basic",
    image: "dapic/basic.png",
    badgeText: "text-gray-900",
    border: "border-gray-400/50",
    glow: "shadow-gray-400/30",
    button: "bg-gray-600 hover:bg-gray-500",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-gray-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" fill="currentColor" className="text-gray-300" /></svg>
    )
  },
  {
    name: "Standard",
    image: "dapic/standard.png",
    badgeText: "text-amber-950",
    border: "border-yellow-500/60",
    glow: "shadow-yellow-500/40",
    button: "bg-amber-600 hover:bg-amber-500",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-yellow-500"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" /><rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" className="text-yellow-300" /></svg>
    )
  },
  {
    name: "Premium",
    image: "dapic/Premium.png",
    badgeText: "text-white",
    border: "border-cyan-400/70",
    glow: "shadow-cyan-400/50",
    button: "bg-cyan-600 hover:bg-cyan-500",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-cyan-400"><polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-cyan-300" /></svg>
    )
  }
];

export default function PackagesPage() {
  const categoryScrollRef = useRef(null);
  const carouselScrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [carouselCanScrollLeft, setCarouselCanScrollLeft] = useState(false);
  const [carouselCanScrollRight, setCarouselCanScrollRight] = useState(true);

  const currentReports = reportsByCategory[categories[activeCategory]];

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselScrollRef.current) {
      const scrollAmount = 400;
      carouselScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const checkCarouselScroll = () => {
    if (carouselScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselScrollRef.current;
      setCarouselCanScrollLeft(scrollLeft > 0);
      setCarouselCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const catRef = categoryScrollRef.current;
    if (catRef) {
      catRef.addEventListener('scroll', checkCategoryScroll);
      checkCategoryScroll();
      return () => catRef.removeEventListener('scroll', checkCategoryScroll);
    }
  }, []);

  useEffect(() => {
    const carRef = carouselScrollRef.current;
    if (carRef) {
      carRef.addEventListener('scroll', checkCarouselScroll);
      checkCarouselScroll();
      carRef.scrollLeft = 0;
    }
  }, [activeCategory]);

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#0f0020]">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-purple-800/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-cyan-800/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="inline-block mb-5 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-5 py-1.5 bg-purple-500/10">
            Market Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Research Packages
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose from our expertly curated research packages, tailored for your industry. Each package includes the latest market trends, growth forecasts, and actionable insights.
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium text-xs sm:text-sm border transition-all duration-300 whitespace-nowrap
                ${activeCategory === index
                  ? 'bg-purple-600 text-white border-transparent shadow-lg shadow-purple-500/40'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-purple-500/50 hover:bg-white/10'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {currentReports.map((report, index) => {
            const tier = packageTiers[index];
            return (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-xl border ${tier.border} rounded-2xl overflow-hidden hover:border-purple-500/70 transition-all duration-500 hover:shadow-2xl hover:${tier.glow}`}
              >
                {/* Tier Badge with SVG icon */}
                <div className={`absolute top-5 right-5 z-10 px-4 py-2 rounded-full flex items-center gap-2 ${index === 0 ? 'bg-gray-500/90' : index === 1 ? 'bg-amber-500/90' : 'bg-cyan-500/90'} shadow-lg`}>
                  {tier.icon}
                  <span className={`text-xs font-bold ${tier.badgeText}`}>{tier.name}</span>
                </div>
                {/* Package Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black/20">
                  <img 
                    src={tier.image} 
                    alt={`${tier.name} Package`}
                    className="w-full h-full object-cover drop-shadow-xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Details */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-purple-400"><rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" /></svg>
                      {report.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-purple-400"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">$</text></svg>
                      <span className="font-bold text-white">{report.price}</span>
                    </span>
                  </div>
                  <button className={`w-full py-3 ${tier.button} text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}