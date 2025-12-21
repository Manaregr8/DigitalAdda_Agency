import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <main className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 py-16 lg:py-24">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Production-Ready Blog Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Clone once,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                customize fast
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
              A production-ready Next.js 14 template with Prisma, PostgreSQL, TipTap editor, and a complete
              admin console. Copy this base for each client project and only swap brand-specific colors,
              typography, or landing pages.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/blog" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-900/20"
              >
                View Blog Posts
              </Link>
              <Link 
                href="/admin/blog" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-semibold hover:border-slate-300 transition-all hover:scale-105"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 lg:mt-32">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">
                Built with Next.js 14 and optimized for performance with server-side rendering and static generation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Rich Editor</h3>
              <p className="text-slate-600">
                TipTap WYSIWYG editor with formatting, links, images, and more for creating beautiful content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">SEO Optimized</h3>
              <p className="text-slate-600">
                Built-in SEO features with meta tags, Open Graph, Twitter Cards, and sitemap generation.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-20 lg:mt-32 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
              Built with modern technologies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="text-slate-400 font-semibold text-lg">Next.js 14</div>
              <div className="text-slate-400 font-semibold text-lg">React 19</div>
              <div className="text-slate-400 font-semibold text-lg">Prisma</div>
              <div className="text-slate-400 font-semibold text-lg">PostgreSQL</div>
              <div className="text-slate-400 font-semibold text-lg">Tailwind CSS</div>
              <div className="text-slate-400 font-semibold text-lg">TipTap</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
