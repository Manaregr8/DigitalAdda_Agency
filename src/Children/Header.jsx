"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navItems = [
    { name: "Services", hasDropdown: true, href: "/services" },
    { name: "Industries", hasDropdown: true, href: "/" },
    { name: "Portfolio", hasDropdown: true, href: "/portfolio" },
    { name: "About", hasDropdown: false, href: "/Aboutus" },
    { name: "blog", hasDropdown: false, href: "/blog" },
  ];

  const dropdownData = {
    Services: [
      { name: "E-commerce", href: "/services/ecommerce" },
      { name: "Paid Advertising", href: "/services/paid-advertising" },
      { name: "SEO", href: "/services/seo" },
      { name: "White Lable", href: "/services/white-label" },
      { name: "Content Marketing", href: "/services/content-marketing" },
      { name: "SMO", href: "/services/smo" },
      { name: "CRO", href: "/services/cro" },
    ],
    Industries: [
      { name: "StartUp Marketing", href: "/industries/startup" },
      { name: "Fashion Digital Marketing Agency", href: "/industries/fashion" },
      { name: "Health Care Digital Marketing", href: "/industries/healthcare" },
      { name: "B2B Digital Marketing", href: "/industries/b2b" },
      { name: "Education Digital Marketing", href: "/industries/education" },
      { name: "Interior Designer Digital Marketing", href: "/industries/interior-designer" },
      { name: "Real Estate Digital Marketing", href: "/industries/real-estate" },
      { name: "Tour & Travel Digital Marketing", href: "/industries/travel-tour" },
      { name: "CA Digital Marketing", href: "/industries/ca" },
      { name: "Lawyer Digital Marketing", href: "/industries/lawyer" },
      { name: "EV Digital Marketing", href: "/industries/ev" },
      { name: "Finance Digital Marketing", href: "/industries/finance" },
      { name: "Construction Digital Marketing", href: "/industries/construction" },
      { name: "Manufacturing Digital Marketing", href: "/industries/manufacturing" },
      { name: "Political Campaign Digital Marketing", href: "/industries/political" },
    ],
    Portfolio: [
      { name: "Case Studies", href: "/portfolio/case-studies" },
      { name: "Reviews and Testimonials", href: "/portfolio/reviews" },
      { name: "Google and Portfolio", href: "/portfolio/google" },
      { name: "Facebook and Portfolio", href: "/portfolio/facebook" },
      { name: "SEO Portfolio", href: "/portfolio/seo" },
    ],
  };

  // Auto-open popup after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 10000); // 60000ms = 1 minute

    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
    };
    
    console.log('Form submitted:', data);
    
    // Show success message
    setShowSuccess(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setPopupOpen(false);
      setShowSuccess(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-black via-purple-900 to-gray-900 shadow-lg">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {!imageError ? (
              <img
                src="/DAFINAL.png"
                // src="/final logo.png"
                alt="Digital Adda"
                className="h-15 w-auto ml-10 md:ml-18   scale-300 md:scale-400"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-white">Digital Adda</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const hasDropdown = dropdownData[item.name];
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:text-purple-300 transition font-medium flex items-center gap-1 py-2"
                  >
                    {item.name}
                    {hasDropdown && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Desktop Dropdown - NO GAP */}
                  {hasDropdown && openDropdown === item.name && (
                    <div className="absolute left-0 pt-0 top-full w-64">
                      <div className="bg-gray-900/98 backdrop-blur-sm rounded-lg shadow-2xl py-2 border border-purple-500/20">
                        {dropdownData[item.name].map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition text-sm"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/Contact"
            className="hidden lg:block px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get in touch
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white z-50 relative"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-linear-to-b from-gray-900 via-purple-900 to-gray-900 z-40 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          {/* Mobile Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-2xl font-bold text-white mb-8"
          >
            Digital Adda
          </Link>

          {/* Mobile Nav Items */}
          {navItems.map((item) => {
            const hasDropdown = dropdownData[item.name];
            const isOpen = openDropdown === item.name;
            return (
              <div key={item.name} className="mb-2">
                {hasDropdown ? (
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className="w-full flex items-center justify-between text-left text-gray-100 hover:text-purple-300 transition text-lg font-medium py-3"
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-left text-gray-100 hover:text-purple-300 transition text-lg font-medium py-3"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mobile Dropdown */}
                {hasDropdown && isOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {dropdownData[item.name].map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-gray-300 hover:text-purple-400 transition text-sm"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-white shadow-2xl shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-center"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* POPUP FORM OVERLAY */}
     {popupOpen && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setPopupOpen(false);
        setShowSuccess(false);
      }
    }}
  >
   {popupOpen && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setPopupOpen(false);
        setShowSuccess(false);
      }
    }}
  >
    {/* Container with hidden scrollbar */}
    <div className="w-full max-w-md max-h-[90vh] overflow-y-auto hide-scrollbar">
      <div className="bg-gradient-to-b from-gray-900 to-purple-900/50 rounded-3xl p-6 md:p-8 relative border border-purple-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            setPopupOpen(false);
            setShowSuccess(false);
          }}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 hover:rotate-90"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {!showSuccess ? (
          <>
            <div className="text-center mb-5">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Get Free Consultation
              </h2>
              <p className="text-gray-300 text-sm">
                Let's discuss how we can help grow your business
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {['name', 'email', 'phone', 'service', 'message'].map((field) => (
                <div key={field}>
                  <label className="block text-white text-sm font-medium mb-2">
                    {field === 'name' && 'Full Name *'}
                    {field === 'email' && 'Email Address *'}
                    {field === 'phone' && 'Phone Number'}
                    {field === 'service' && 'Service Interested In *'}
                    {field === 'message' && 'Tell us about your project'}
                  </label>
                  {field === 'service' ? (
                    <select
                      name="service"
                      required
                      className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition appearance-none text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="vr-development">VR Development</option>
                      <option value="brand-strategy">Brand Strategy</option>
                      <option value="seo">SEO & Content</option>
                      <option value="social-media">Social Media Marketing</option>
                      <option value="web-development">Web Development</option>
                      <option value="other">Other</option>
                    </select>
                  ) : field === 'message' ? (
                    <textarea
                      name="message"
                      rows="2"
                      placeholder="Describe your requirements..."
                      className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none text-sm"
                    ></textarea>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      required={field !== 'phone'}
                      placeholder={
                        field === 'name'
                          ? 'John Doe'
                          : field === 'email'
                          ? 'john@example.com'
                          : '+91 **********'
                      }
                      className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white shadow-lg hover:scale-[1.02] transition-transform duration-300 text-sm md:text-base"
              >
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl md:text-4xl text-white">✓</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-300 text-sm px-2">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
  </div>
)}

      {/* FLOATING WHATSAPP BUTTON */}
   <a href="https://wa.me/1234567890"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
>
  <img 
    className="w-8 h-8" 
    src="/social.png" 
    alt="WhatsApp" 
  />
</a>

      {/* AI CHATBOT TOGGLE BUTTON */}
      <div
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 left-6 z-50 cursor-pointer group"
      >
        <div className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
           <img 
    className="w-8 h-8" 
    src="/robot.png" 
    alt="WhatsApp" 
  />
        </div>
      </div>

      {/* AI CHATBOT PANEL */}
      <div
        className={`fixed bottom-24 left-6 z-50 w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-purple-500/30 transform transition-all duration-300 ${
          chatOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* HEADER */}
        <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex items-center justify-between">
          <span className="text-white font-bold text-lg">AI Assistant</span>
          <button
            onClick={() => setChatOpen(false)}
            className="text-purple-200 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT CONTENT */}
        <div className="p-4 h-[380px] overflow-y-auto space-y-4">
          <div className="bg-purple-600/20 p-3 rounded-lg text-gray-200 text-sm">
            👋 Hi! How can I help you today?
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-gray-200 text-sm ml-auto max-w-[80%]">
            I want marketing help
          </div>
          <div className="bg-purple-600/20 p-3 rounded-lg text-gray-200 text-sm">
            ✅ Sure! We offer SEO, Ads, Websites & more.
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              ▶
            </button>
          </div>
        </div>
      </div>
    </>
  );
}