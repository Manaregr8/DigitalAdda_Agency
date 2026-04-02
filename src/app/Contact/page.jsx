"use client";
import React, { useState } from 'react';
import { Send, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "8b5d3f99-8f11-4cfc-bcab-35143aba7bc4");
    formDataToSend.append("name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully! We'll get back to you shortly.");
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <>
      {/* HERO SECTION - Modern, smaller headings, less gradient */}
      <section className="relative min-h-[320px] flex items-center justify-center text-center bg-[#18122b]">
        <div className="w-full max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white">
            Let's Connect & <span className="text-purple-400">Grow</span> Together
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4">
            Have a question, need expert guidance, or ready to take the next step?
          </p>
        </div>
      </section>

      {/* No divider or gap here for seamless transition */}

      {/* MAIN CONTENT - Modern, more whitespace, subtle divider */}
      <section className="bg-[#18122b] py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">

          {/* Left Side – Content + Social Handles */}
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                We're Here to Help You Grow
              </h2>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-2">
                <p>
                  Whether you have a question, a project in mind, or just want to explore possibilities — we're here to help.
                </p>
                <p>
                  Our team is ready to assist you with expert guidance, quick responses, and reliable support at every step of your journey.
                </p>
              </div>
            </div>

            {/* Social Media Handles */}
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: Instagram, name: "Instagram", handle: "Digitaladdaagency", link: "https://www.instagram.com/digitaladdaagency/" },
                { icon: Linkedin, name: "LinkedIn", handle: "Digitaladdaagency", link: "https://www.linkedin.com/in/digitaladda-agency-283322372/" },
                { icon: Facebook, name: "Facebook", handle: "Digitaladdaagency", link: "https://www.facebook.com/profile.php?id=61577146244812" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/40 border border-gray-800 rounded-lg hover:border-purple-500/60 hover:bg-gray-900/60 transition-all group"
                >
                  <div className={`p-2 rounded-lg ${i === 0 ? 'bg-pink-600' : i === 1 ? 'bg-blue-600' : 'bg-purple-600'} group-hover:scale-110 transition-transform`}>
                    <social.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{social.name}</p>
                    <p className="text-sm text-white font-semibold break-all">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-gray-500 text-xs">
              Prefer email? <a href="mailto:Info@digitaladdagagency.com" className="text-purple-400 hover:underline break-all">Info@digitaladdagagency.com</a>
            </p>
          </div>

          {/* Right Side – Contact Form */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 sm:p-7 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Start the Conversation</h3>
            <div className="w-16 h-1 bg-purple-500 rounded-full mb-4"></div>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name *"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition text-sm sm:text-base"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition text-sm sm:text-base"
              />
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm sm:text-base"
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us how we can help you *"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition resize-none text-sm sm:text-base"
              />

              {result && (
                <div className={`p-3 sm:p-4 rounded-xl text-center font-medium text-sm sm:text-base ${
                  result.includes("Successfully") 
                    ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                    : result.includes("Sending")
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {result}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-bold text-base rounded-lg transition-all shadow flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}