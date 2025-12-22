import React from "react";
import industriesData from "../../Data/industries.json";

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industryName = industriesData.industrySlugMap[slug];

  if (!industryName) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#17042e] to-[#40196e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-300">Industry not found</p>
        </div>
      </div>
    );
  }

  // 🔁 NEW: Pull *all* data from industries[industryName]
  const industryData = industriesData.industries[industryName];
  const heroContent = industryData.hero;
  const warningSigns = industryData.warningSigns || [];
  const approachHighlights = industryData.approachHighlights || [];
  const ctaText = industryData.cta || "Get Started";
  const stats = industryData.stats || [
    "500+ Clients",
    "2.5M+ Leads",
    "98% Satisfaction",
    "4.9 Rating",
  ];
  const plans = industriesData.plans;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#17042e] to-[#40196e] text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            ✨ {industryName}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {heroContent.title}
          </h1>

          <p className="text-2xl md:text-3xl mb-4 bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
            {heroContent.subtitle}
          </p>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>

          <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
            {ctaText} →
          </button>
        </div>

        {/* GLOW EFFECTS */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* ================= WARNING SIGNS ================= */}
      {warningSigns.length > 0 && (
        <section className="py-20 px-6 bg-linear-to-br from-[#17042e] to-[#40196e] relative overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .flip-card {
              perspective: 1000px;
            }
            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              transform-style: preserve-3d;
            }
            .flip-card:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
            .flip-card-front, .flip-card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .flip-card-back {
              transform: rotateY(180deg);
            }
          `,
            }}
          />

          {/* Decorative dots in top right */}
          <div className="absolute top-8 right-8 w-16 h-16 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Why Choose Us ? <br />
              <p> — Premium, Powerful, AI+VR Digital Marketing Positioning —</p>
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
              If your social media feels like shouting into the void, you're not
              alone
              <br />
              —but you don't have to stay there.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {warningSigns.map((sign, i) => (
                <div
                  key={i}
                  className="h-auto w-full rounded-3xl overflow-hidden"
                  // flip motion commented below
                  // className="flip-card h-80 w-full"
                >
                  <div
                    className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-purple-500/30 flex flex-col h-full"
                    // flip motion commented below
                    // className="flip-card-inner"
                  >
                    {/* Front of card (now the only side) */}
                    <div
                      className="flex flex-col h-full"
                      // flip-card-front commented
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl mb-6">
                        {sign.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 break-words">
                        {sign.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed break-words">
                        {sign.description}
                      </p>
                    </div>

                    {/* Back removed OR you can keep it commented */}
                    {/*
        <div className="flip-card-back p-8 bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl flex flex-col justify-center items-center text-center border border-purple-400">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl mb-6">
            ✨
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            We Can Help!
          </h3>
          <p className="text-white/90 leading-relaxed mb-6">
            Transform your social media presence with our expert
            strategies and proven solutions.
          </p>
          <button className="bg-white text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
            Learn More →
          </button>
        </div>
        */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= STATS ================= */}
      <section className="py-16 px-6 bg-black/20 backdrop-blur-sm overflow-hidden relative">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `,
          }}
        />

        <div className="relative">
          <div className="flex animate-marquee">
            {/* First set */}
            {stats.map((item, i) => (
              <div
                key={i}
                className="shrink-0 mx-4 text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:transform hover:scale-105 w-72"
              >
                <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {item.split(" ")[0]}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {item.split(" ").slice(1).join(" ")}
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {stats.map((item, i) => (
              <div
                key={`dup-${i}`}
                className="shrink-0 mx-4 text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:transform hover:scale-105 w-72"
              >
                <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {item.split(" ")[0]}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {item.split(" ").slice(1).join(" ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY OUR APPROACH WORKS ================= */}
      {approachHighlights.length > 0 && (
        <section className="py-20 px-6 bg-linear-to-br from-[#17042e] to-[#40196e]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Our Approach Works
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We don't just make your feed pretty—we make it profitable. Every
                post is strategically designed to grow your audience and drive
                results.
              </p>
            </div>

            <div className="space-y-8">
              {approachHighlights.map((item, i) => (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 hover:border-purple-500/60 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="shrink-0 w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PRICING ================= */}
      <section className="py-20 px-6 bg-[#0a0220]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Growth Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {(Array.isArray(industryData.plans)
                ? industryData.plans
                : (typeof industryData.plans === 'object' && industryData.plans !== null)
                  ? Object.values(industryData.plans)
                  : [])
              .sort((a, b) => {
                const order = { Starter: 0, Growth: 1, Premium: 2 };
                return (order[a.name] || 999) - (order[b.name] || 999);
              })
              .map((plan, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-3xl backdrop-blur-md border transition-all duration-300 hover:scale-105 group flex flex-col ${
                    plan.name === "Premium"
                      ? "bg-linear-to-br from-purple-600/30 to-pink-600/30 border-purple-500 shadow-2xl shadow-purple-500/50 md:-mt-6 md:mb-6 md:scale-105"
                      : "bg-white/5 border-purple-500/30 hover:border-purple-500/60"
                  }`}
                  style={{ minHeight: "680px" }}
                >
                  {/* Different background image for each card */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url('${
                        i === 0
                          ? "https://thumbs.dreamstime.com/b/blurred-office-interior-space-background-people-working-meeting-desk-business-concept-ai-generated-297090070.jpg"
                          : i === 1
                          ? "https://www.shutterstock.com/image-photo/blurred-office-meeting-diverse-people-260nw-2697683263.jpg"
                          : "https://thumbs.dreamstime.com/b/corporate-collaboration-abstract-blurred-office-background-modern-space-symbolizing-teamwork-business-meeting-concepts-410876859.jpg"
                      }')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#17042e]/90 to-[#17042e]" />

                  {/* Badge */}
                  {plan.badge && (
                    <div className="relative z-20 mx-8 mt-6">
                      <div className="inline-block bg-linear-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col flex-1">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {plan.name}
                      </h3>
                      <div className="min-h-[60px] flex items-center justify-center">
                        <p className="text-sm text-gray-300 leading-relaxed px-2">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <span className="text-6xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {plan.term.replace(" Months", "")}
                      </span>
                      <span className="block text-xl text-gray-400 mt-2">
                        Months
                      </span>
                    </div>

                    {/* Pure CSS Collapsible Features */}
                    <div className="mb-6 flex-1 flex flex-col relative">
                      {/* Hidden checkbox */}
                      <input
                        type="checkbox"
                        id={`expand-features-${i}`}
                        className="peer sr-only"
                      />

                      {/* Features List - Flexible height container */}
                      <div className="flex-1 flex flex-col">
                        <ul className="space-y-4 text-base max-h-[280px] peer-checked:max-h-[2000px] overflow-hidden transition-all duration-500 ease-in-out">
                          {plan.features.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-green-400 text-xl shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span className="text-gray-200 leading-relaxed">
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Toggle Label */}
                        {plan.features.length > 6 && (
                          <label
                            htmlFor={`expand-features-${i}`}
                            className="mt-5 block text-purple-400 hover:text-purple-300 font-semibold text-center cursor-pointer transition-colors"
                          >
                            <span className="inline-flex items-center gap-2 peer-checked:hidden">
                              <span>Show More</span>
                              <span className="text-xs opacity-70 font-normal">
                                +{plan.features.length - 6}
                              </span>
                              <span>↓</span>
                            </span>
                            <span className="hidden items-center gap-2 peer-checked:inline-flex">
                              <span>Show Less</span>
                              <span>↑</span>
                            </span>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* CTA Button - Fixed at bottom */}
                    <div className="mt-auto pt-6">
                      <button
                        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 ${
                          plan.name === "Premium" || plan.name === "Starter"
                            ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            : "bg-purple-800/50 hover:bg-purple-700/70 text-white border border-purple-500/50"
                        }`}
                      >
                        Start Your Success
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Grow{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {industryName}
            </span>
            ?
          </h2>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Let's build something powerful.
          </p>

          <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            {ctaText} 🚀
          </button>
        </div>

        {/* DECORATIVE GLOW */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(industriesData.industrySlugMap).map((slug) => ({ slug }));
}
