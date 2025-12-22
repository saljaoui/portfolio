import { useState, useEffect } from 'react';

export default function Contact(active: { active: boolean }) {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Design',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (active.active) {
      setAnimate(false);
      const t = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(t);
    } else {
      setAnimate(false);
    }
  }, [active.active]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log('Form submitted:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <section id="contact" className="w-screen h-screen flex-shrink-0 bg-white text-black relative flex items-center justify-center px-8 py-6 overflow-hidden">
      {/* Dot Pattern Background */}
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-1000 ${
          animate ? 'opacity-[0.03]' : 'opacity-0'
        }`}
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Animated Gradient Orbs */}
      <div 
        className={`absolute top-10 left-10 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
        }`}
      ></div>
      <div 
        className={`absolute bottom-10 right-10 w-72 h-72 bg-gray-300/20 rounded-full blur-3xl transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
        }`}
        style={{ 
          animationDelay: animate ? '1s' : undefined
        }}
      ></div>

      <div className="max-w-6xl w-full h-full relative z-10 flex gap-10 items-center">
        {/* Left Side - Info */}
        <div className="flex-1 space-y-6">
          <div className="mb-6">
            <p 
              className={`text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <span className="w-6 h-px bg-gray-400"></span>
              GET IN TOUCH
            </p>
            <h1 
              className={`text-5xl md:text-6xl font-bold mb-2 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              LET'S WORK
            </h1>
            <h1 
              className={`text-5xl md:text-6xl font-bold mb-5 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{
                WebkitTextStroke: "2px rgba(0, 0, 0, 1)",
                color: "transparent",
                transitionDelay: '200ms'
              }}
            >
              TOGETHER.
            </h1>
            <p 
              className={`text-gray-600 leading-relaxed max-w-md transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              I'm available for freelance work. Have a project in mind? Send a message or reach out directly.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div 
              className={`flex items-start gap-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="p-2.5 bg-black text-white rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36">
                  <path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z" />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">EMAIL</p>
                <p className="font-medium text-sm text-black group-hover:text-gray-600 transition-colors truncate">soufian2022ff@gmail.com</p>
              </div>
            </div>
            
            <div 
              className={`flex items-start gap-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="p-2.5 bg-black text-white rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m16.1 13.359l-.528-.532l.529.532Zm.456-.453l.529.532l-.529-.532Zm2.417-.317l-.358.66l.358-.66Zm1.91 1.039l-.358.659l.358-.659Zm.539 3.255l.529.532l-.53-.532Zm-1.42 1.412l-.53-.531l.53.531Zm-1.326.67l.07.747l-.07-.747Zm-9.86-4.238l.528-.532l-.529.532ZM4.002 5.746l-.749.042l.749-.042Zm6.474 1.451l.53.532l-.53-.532Zm.157-2.654l.6-.449l-.6.45ZM9.374 2.86l-.601.45l.6-.45ZM6.26 2.575l.53.532l-.53-.532Zm-1.57 1.56l-.528-.531l.529.532Zm7.372 7.362l.529-.532l-.529.532Zm4.566 2.394l.456-.453l-1.058-1.064l-.455.453l1.058 1.064Zm1.986-.643l1.91 1.039l.716-1.318l-1.91-1.038l-.716 1.317Zm2.278 3.103l-1.42 1.413l1.057 1.063l1.42-1.412l-1.057-1.064Zm-2.286 1.867c-1.45.136-5.201.015-9.263-4.023l-1.057 1.063c4.432 4.407 8.65 4.623 10.459 4.454l-.14-1.494Zm-9.263-4.023c-3.871-3.85-4.512-7.087-4.592-8.492l-1.498.085c.1 1.768.895 5.356 5.033 9.47l1.057-1.063Zm1.376-6.18l.286-.286L9.95 6.666l-.287.285l1.057 1.063Zm.515-3.921L9.974 2.41l-1.201.899l1.26 1.684l1.202-.899ZM5.733 2.043l-1.57 1.56l1.058 1.064l1.57-1.56l-1.058-1.064Zm4.458 5.44c-.53-.532-.53-.532-.53-.53h-.002l-.003.004a1.064 1.064 0 0 0-.127.157c-.054.08-.113.185-.163.318a2.099 2.099 0 0 0-.088 1.071c.134.865.73 2.008 2.256 3.526l1.058-1.064c-1.429-1.42-1.769-2.284-1.832-2.692c-.03-.194.001-.29.01-.312c.005-.014.007-.015 0-.006a.276.276 0 0 1-.03.039l-.01.01a.203.203 0 0 1-.01.009l-.53-.53Zm1.343 4.546c1.527 1.518 2.676 2.11 3.542 2.242c.443.068.8.014 1.071-.087a1.536 1.536 0 0 0 .42-.236a.923.923 0 0 0 .05-.045l.007-.006l.003-.003l.001-.002s.002-.001-.527-.533c-.53-.532-.528-.533-.528-.533l.002-.002l.002-.002l.006-.005l.01-.01a.383.383 0 0 1 .038-.03c.01-.007.007-.004-.007.002c-.025.009-.123.04-.32.01c-.414-.064-1.284-.404-2.712-1.824l-1.058 1.064Zm-1.56-9.62C8.954 1.049 6.95.834 5.733 2.044L6.79 3.107c.532-.529 1.476-.475 1.983.202l1.2-.9ZM4.752 5.704c-.02-.346.139-.708.469-1.036L4.163 3.604c-.537.534-.96 1.29-.909 2.184l1.498-.085Zm14.72 12.06c-.274.274-.57.428-.865.455l.139 1.494c.735-.069 1.336-.44 1.784-.885l-1.058-1.063ZM11.006 7.73c.985-.979 1.058-2.527.229-3.635l-1.201.899c.403.539.343 1.246-.085 1.673l1.057 1.063Zm9.52 6.558c.817.444.944 1.49.367 2.064l1.058 1.064c1.34-1.333.927-3.557-.71-4.446l-.716 1.318Zm-3.441-.849c.384-.382 1.002-.476 1.53-.19l.716-1.317c-1.084-.59-2.428-.427-3.304.443l1.058 1.064Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">PHONE</p>
                <p className="font-medium text-sm text-black group-hover:text-gray-600 transition-colors">+212 71081736</p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="p-2.5 bg-black text-white rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 8.515C5 4.917 8.134 2 12 2s7 2.917 7 6.515c0 3.57-2.234 7.735-5.72 9.225a3.277 3.277 0 0 1-2.56 0C7.234 16.25 5 12.084 5 8.515Z" />
                    <path d="M14 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
                    <path strokeLinecap="round" d="M20.96 15.5c.666.602 1.04 1.282 1.04 2c0 2.485-4.477 4.5-10 4.5S2 19.985 2 17.5c0-.718.374-1.398 1.04-2" />
                  </g>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">LOCATION</p>
                <p className="font-medium text-sm text-black group-hover:text-gray-600 transition-colors">Oujda, Morocco</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div 
            className={`flex gap-3 pt-4 border-t border-gray-200 transition-all duration-700 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-medium text-xs uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="relative z-10">LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-black rounded-lg font-medium text-xs uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="relative z-10">GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div 
          className={`flex-1 transition-all duration-700 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-7 rounded-xl shadow-xl border border-gray-200 relative overflow-hidden">
            {/* Decorative corners */}
            <div 
              className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-black/10 rounded-tl-xl transition-all duration-1000 ${
                animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            ></div>
            <div 
              className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-black/10 rounded-br-xl transition-all duration-1000 ${
                animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            ></div>

            <div className="space-y-5 relative z-10">
              {/* Name and Email Row */}
              <div 
                className={`grid grid-cols-2 gap-3 transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <div className="group">
                  <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                    <span className="w-3 h-px bg-gray-400 group-hover:w-5 transition-all duration-300"></span>
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white focus:shadow-md focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                    <span className="w-3 h-px bg-gray-400 group-hover:w-5 transition-all duration-300"></span>
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white focus:shadow-md focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div 
                className={`transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                  <span className="w-3 h-px bg-gray-400"></span>
                  Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Web Design', 'Development', 'Freelance', 'Other'].map((option, i) => (
                    <button
                      key={option}
                      onClick={() => handleChange('subject', option)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group/btn ${formData.subject === option
                          ? 'bg-black text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        }`}
                    >
                      {formData.subject === option && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                      )}
                      <span className="relative z-10">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div 
                className={`group transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                  <span className="w-3 h-px bg-gray-400 group-hover:w-5 transition-all duration-300"></span>
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-black focus:bg-white focus:shadow-md focus:outline-none transition-all resize-none text-sm"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:shadow-xl transition-all duration-700 flex items-center justify-center gap-2 group/submit hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700"></div>

                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <path stroke="currentColor" strokeWidth="2" d="m18.636 15.67l1.716-5.15c1.5-4.498 2.25-6.747 1.062-7.934c-1.187-1.187-3.436-.438-7.935 1.062L8.33 5.364C4.7 6.574 2.885 7.18 2.37 8.067a2.717 2.717 0 0 0 0 2.73c.515.888 2.33 1.493 5.96 2.704c.584.194.875.291 1.119.454c.236.158.439.361.597.597c.163.244.26.535.454 1.118c1.21 3.63 1.816 5.446 2.703 5.962a2.72 2.72 0 0 0 2.731 0c.887-.516 1.492-2.331 2.703-5.962Z" />
                      <path fill="currentColor" d="M16.212 8.848a.75.75 0 0 0-1.055-1.066l1.055 1.066Zm-5.55 5.488l5.55-5.488l-1.055-1.066l-5.55 5.488l1.056 1.066Z" />
                    </svg>
                  </>
                )}
              </button>

              {/* Success message placeholder */}
              <div 
                className={`text-center text-xs text-gray-500 italic transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}