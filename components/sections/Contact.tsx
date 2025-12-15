import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Design',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <section id="contact" className="w-screen h-screen flex-shrink-0 bg-white text-black relative flex items-center justify-center px-8">
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="max-w-6xl w-full relative z-10 flex gap-12 items-start">
        {/* Left Side - Info */}
        <div className="flex-1">
          <div className="mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">/ GET IN TOUCH</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              LET'S WORK
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold mb-6"
              style={{
                WebkitTextStroke: "2px rgba(0, 0, 0, 1)",
                color: "transparent"
              }}
            >
              TOGETHER.
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-md">
              I'm currently available for freelance work. Have a project in mind? Send a message or reach out directly.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-black mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">EMAIL</p>
                <p className="font-medium">bensaltanahoussam7@email.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-black mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">PHONE</p>
                <p className="font-medium">+212 614038394</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-black mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">LOCATION</p>
                <p className="font-medium">Safi, Morocco</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-8">
            <button className="text-sm font-medium hover:text-gray-600 transition-colors">LINKEDIN</button>
            <button className="text-sm font-medium hover:text-gray-600 transition-colors">GITHUB</button>
          </div>
        </div>

        {/* Right Side - Form */}
<div className="flex-1">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50">
            <div className="space-y-5">
              {/* Name and Email Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-3">Subject</label>
                <div className="flex flex-wrap gap-2">
                  {['Web Design', 'Development', 'Freelance', 'Other'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleChange('subject', option)}
                      className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        formData.subject === option
                          ? 'bg-black text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all resize-none text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 font-semibold uppercase tracking-wider rounded-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02]"
              >
                Send Message
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}