// app/about/page.jsx
import {
  Brain,
  Sparkles,
  Zap,
  Target,
  Shield,
  Rocket,
  Atom,
  Palette,
  BarChart3,
  Users,
  Globe,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Full-page dark purple linear background */}
      <div className="fixed inset-0 -z-10 bg-[#0f0020]" />

      <main className="min-h-screen text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          {/* HERO - Modern, smaller headings, less gradient */}
          <section className="text-center py-16 sm:py-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              We Are <span className="text-purple-400">DigitalAdda</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-300 mb-6">
              Your Growth Partner
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 mb-8">
              DigitalAdda Agency is India’s next-generation AI + VR powered digital growth agency. We blend Artificial Intelligence and Virtual Reality marketing to create immersive, data-driven brand experiences that attract, engage, and convert faster than traditional marketing.
            </p>
            <button className="rounded-lg bg-purple-600 hover:bg-purple-700 px-8 py-3 text-base font-bold shadow-md ring-1 ring-purple-400/20 transition">
              Discover Our Story
            </button>
          </section>

          <div className="border-t border-white/10 my-12" />

          {/* QUOTE + DESCRIPTION - Modern grid, smaller headings */}
          <section className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-purple-400" />
                <p className="text-xl sm:text-2xl font-semibold leading-tight">
                  “We don’t just market brands,
                  <br />
                  <span className="text-purple-300">We Engineer</span>
                  <br />
                  experiences.”
                </p>
              </div>
              <p className="text-base text-gray-400">— Our Mantra</p>
            </div>

            <div className="flex flex-col justify-center space-y-4 text-sm text-gray-300">
              <p>
                With AI as our engine and VR as our stage, we build futuristic marketing campaigns that are personalized, immersive, and performance-focused. From AI-powered ad targeting and chat automation to VR product demos and virtual showrooms, we help brands stand out in an overcrowded digital world.
              </p>
              <p>
                We don’t chase trends — we create smarter, faster, and more powerful ways for businesses to grow.
              </p>
            </div>
          </section>

          <div className="border-t border-white/10 my-12" />

          {/* PILLARS - Modern, less gradient, more whitespace */}
          <section className="py-10 sm:py-14">
            <h2 className="mb-8 text-center text-2xl font-bold text-white tracking-tight">
              The DigitalAdda Pillars
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="group rounded-xl bg-white/3 p-6 text-center ring-1 ring-white/10 transition-all duration-300 hover:bg-white/7 hover:ring-purple-400/30 hover:shadow-lg"
                >
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${pillar.linear}`}
                  >
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-white/10 my-12" />

          {/* FINAL TAGLINE - Modern, smaller heading */}
          <section className="py-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              Building Powerful <span className="text-cyan-300">Business Success Stories</span>
            </h2>
          </section>
        </div>
      </main>
    </>
  );
}

const pillars = [
  {
    icon: Atom,
    title: "AI-Powered Strategy Development",
    desc: "Smart, data-driven marketing strategies powered by Artificial Intelligence to predict trends, target the right audience, and maximize ROI.",
    linear: "bg-purple-500",
  },
  {
    icon: Target,
    title: "VR Experience Marketing",
    desc: "Immersive Virtual Reality campaigns that allow customers to experience your brand, product, or service in a fully interactive digital environment.",
    linear: "bg-cyan-500",
  },
  {
    icon: Users,
    title: "Customer Intelligence & Behavior Analysis",
    desc: "Deep AI-based audience research, behavioral tracking, and personalized marketing funnels that convert leads into loyal customers.",
    linear: "bg-green-500",
  },
  {
    icon: BarChart3,
    title: "Market Research & Digital Assessment",
    desc: "Comprehensive market analysis, competitor benchmarking, and digital audits to identify growth opportunities for your business.",
    linear: "bg-orange-500",
  },
  {
    icon: Lightbulb,
    title: "Opportunity Mapping & Growth Planning",
    desc: "AI-backed opportunity analysis that validates business ideas, identifies high-performing channels, and builds scalable growth roadmaps.",
    linear: "bg-amber-500",
  },
  {
    icon: Globe,
    title: "Competitive Intelligence (CI)",
    desc: "Real-time tracking of competitors’ strategies, ads, content, and performance to keep your brand one step ahead.",
    linear: "bg-indigo-600",
  },
];
