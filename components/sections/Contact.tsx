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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36">
                <path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z" />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">GMAIL</p>
                <p className="font-medium">soufian2022ff@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="m16.1 13.359l-.528-.532l.529.532Zm.456-.453l.529.532l-.529-.532Zm2.417-.317l-.358.66l.358-.66Zm1.91 1.039l-.358.659l.358-.659Zm.539 3.255l.529.532l-.53-.532Zm-1.42 1.412l-.53-.531l.53.531Zm-1.326.67l.07.747l-.07-.747Zm-9.86-4.238l.528-.532l-.529.532ZM4.002 5.746l-.749.042l.749-.042Zm6.474 1.451l.53.532l-.53-.532Zm.157-2.654l.6-.449l-.6.45ZM9.374 2.86l-.601.45l.6-.45ZM6.26 2.575l.53.532l-.53-.532Zm-1.57 1.56l-.528-.531l.529.532Zm7.372 7.362l.529-.532l-.529.532Zm4.566 2.394l.456-.453l-1.058-1.064l-.455.453l1.058 1.064Zm1.986-.643l1.91 1.039l.716-1.318l-1.91-1.038l-.716 1.317Zm2.278 3.103l-1.42 1.413l1.057 1.063l1.42-1.412l-1.057-1.064Zm-2.286 1.867c-1.45.136-5.201.015-9.263-4.023l-1.057 1.063c4.432 4.407 8.65 4.623 10.459 4.454l-.14-1.494Zm-9.263-4.023c-3.871-3.85-4.512-7.087-4.592-8.492l-1.498.085c.1 1.768.895 5.356 5.033 9.47l1.057-1.063Zm1.376-6.18l.286-.286L9.95 6.666l-.287.285l1.057 1.063Zm.515-3.921L9.974 2.41l-1.201.899l1.26 1.684l1.202-.899ZM5.733 2.043l-1.57 1.56l1.058 1.064l1.57-1.56l-1.058-1.064Zm4.458 5.44c-.53-.532-.53-.532-.53-.53h-.002l-.003.004a1.064 1.064 0 0 0-.127.157c-.054.08-.113.185-.163.318a2.099 2.099 0 0 0-.088 1.071c.134.865.73 2.008 2.256 3.526l1.058-1.064c-1.429-1.42-1.769-2.284-1.832-2.692c-.03-.194.001-.29.01-.312c.005-.014.007-.015 0-.006a.276.276 0 0 1-.03.039l-.01.01a.203.203 0 0 1-.01.009l-.53-.53Zm1.343 4.546c1.527 1.518 2.676 2.11 3.542 2.242c.443.068.8.014 1.071-.087a1.536 1.536 0 0 0 .42-.236a.923.923 0 0 0 .05-.045l.007-.006l.003-.003l.001-.002s.002-.001-.527-.533c-.53-.532-.528-.533-.528-.533l.002-.002l.002-.002l.006-.005l.01-.01a.383.383 0 0 1 .038-.03c.01-.007.007-.004-.007.002c-.025.009-.123.04-.32.01c-.414-.064-1.284-.404-2.712-1.824l-1.058 1.064Zm-1.56-9.62C8.954 1.049 6.95.834 5.733 2.044L6.79 3.107c.532-.529 1.476-.475 1.983.202l1.2-.9ZM4.752 5.704c-.02-.346.139-.708.469-1.036L4.163 3.604c-.537.534-.96 1.29-.909 2.184l1.498-.085Zm14.72 12.06c-.274.274-.57.428-.865.455l.139 1.494c.735-.069 1.336-.44 1.784-.885l-1.058-1.063ZM11.006 7.73c.985-.979 1.058-2.527.229-3.635l-1.201.899c.403.539.343 1.246-.085 1.673l1.057 1.063Zm9.52 6.558c.817.444.944 1.49.367 2.064l1.058 1.064c1.34-1.333.927-3.557-.71-4.446l-.716 1.318Zm-3.441-.849c.384-.382 1.002-.476 1.53-.19l.716-1.317c-1.084-.59-2.428-.427-3.304.443l1.058 1.064Z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">PHONE</p>
                <p className="font-medium">+212 71081736</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 8.515C5 4.917 8.134 2 12 2s7 2.917 7 6.515c0 3.57-2.234 7.735-5.72 9.225a3.277 3.277 0 0 1-2.56 0C7.234 16.25 5 12.084 5 8.515Z" />
                  <path d="M14 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
                  <path strokeLinecap="round" d="M20.96 15.5c.666.602 1.04 1.282 1.04 2c0 2.485-4.477 4.5-10 4.5S2 19.985 2 17.5c0-.718.374-1.398 1.04-2" />
                </g>
              </svg>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">LOCATION</p>
                <p className="font-medium">Oujda, Morocco</p>
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
        <div className="flex-1 border-gray-300">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-300">
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all text-sm"
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
                      className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${formData.subject === option
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all resize-none text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-4 font-semibold uppercase tracking-wider hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02]"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none">
                    <path stroke="currentColor" strokeWidth="1.5" d="m18.636 15.67l1.716-5.15c1.5-4.498 2.25-6.747 1.062-7.934c-1.187-1.187-3.436-.438-7.935 1.062L8.33 5.364C4.7 6.574 2.885 7.18 2.37 8.067a2.717 2.717 0 0 0 0 2.73c.515.888 2.33 1.493 5.96 2.704c.584.194.875.291 1.119.454c.236.158.439.361.597.597c.163.244.26.535.454 1.118c1.21 3.63 1.816 5.446 2.703 5.962a2.72 2.72 0 0 0 2.731 0c.887-.516 1.492-2.331 2.703-5.962Z" />
                    <path fill="currentColor" d="M16.212 8.848a.75.75 0 0 0-1.055-1.066l1.055 1.066Zm-5.55 5.488l5.55-5.488l-1.055-1.066l-5.55 5.488l1.056 1.066Z" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}