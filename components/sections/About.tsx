import { useEffect, useState } from "react";

export default function About(active: { active: boolean }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (active.active) {
      setAnimate(false)
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    } else {
      setAnimate(false)
    }
  }, [active.active])

  return (
    <section className="w-screen h-screen flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-24 overflow-hidden relative">
      {/* Animated decorative circles */}
      <div 
        className={`absolute -top-16 mx-auto w-32 h-32 rounded-full border-2 border-gray-200 transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{ transitionDelay: '200ms' }}
      />
      <div 
        className={`absolute -top-12 mx-auto w-24 h-24 rounded-full border-2 border-gray-300 transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{ transitionDelay: '300ms' }}
      />
      <div 
        className={`absolute -top-8 mx-auto w-16 h-16 rounded-full border-2 border-gray-400 transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{ transitionDelay: '400ms' }}
      />

      <div className="max-w-7xl w-full">
        {/* Header - Slide in from left */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            animate ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-gray-900">SOUFIAN</span>{" "}
            <span
              className="text-black/10"
              style={{
                letterSpacing: "-0.02em",
                WebkitTextStroke: "2px rgba(0, 0, 0, 0.5)",
              }}
            >
              ALJAOUI
            </span>
          </h1>
          <div className="h-px w-32 bg-black/80"></div>
        </div>

        {/* Profile Section */}
        <div className="mb-10">
          <div className="flex flex-row items-start gap-6">
            {/* Profile Picture - Scale and fade in */}
            <div 
              className={`flex-shrink-0 transition-all duration-700 ${
                animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-32 h-32 shadow-xl flex items-center justify-center transition-transform hover:scale-105 duration-300 overflow-hidden border-1 border-gray-600">
                <img
                  src="../images/about_image.jpg"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content - Slide in from right */}
            <div 
              className={`flex-1 transition-all duration-700 ${
                animate ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Who I Am</h2>
              <p className="text-gray-700 leading-relaxed mb-2 text-lg">
                I'm a passionate developer dedicated to creating innovative solutions and continuously learning new technologies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With a strong foundation in software development and a keen eye for design, I strive to build applications that are both functional and beautiful.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section - Horizontal */}
        <div>
          <h2 
            className={`text-3xl font-bold text-gray-900 mb-6 transition-all duration-700 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            My Journey
          </h2>
          
          <div className="relative px-8">
            {/* Timeline Line - Expand from left to right */}
            <div 
              className={`absolute top-1.5 left-0 h-px bg-gray-300 transition-all duration-1000 ${
                animate ? 'right-0' : 'right-full'
              }`}
              style={{ transitionDelay: '500ms' }}
            ></div>

            {/* Start Point */}
            <div 
              className={`absolute left-0 top-0 w-3 h-3 bg-white border-2 border-gray-300 rounded-full z-10 transition-all duration-500 ${
                animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            ></div>

            {/* End Point */}
            <div 
              className={`absolute right-0 top-0 w-3 h-3 bg-white border-2 border-gray-300 rounded-full z-10 transition-all duration-500 ${
                animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{ transitionDelay: '1400ms' }}
            ></div>

            {/* Timeline Items */}
            <div className="relative flex justify-between items-start gap-16">
              {/* 2023 - Fade in and slide up */}
              <div 
                className={`flex flex-col items-center flex-1 transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <div className="w-3 h-3 bg-black rounded-full z-10 mb-4"></div>
                <div className="text-center max-w-xs">
                  <div className="text-lg font-bold text-black mb-2">2023</div>
                  <p className="text-gray-800 font-medium mb-2 text-sm">Baccalaureate Obtained</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Successfully completed high school education, laying the foundation for my tech journey.
                  </p>
                </div>
              </div>

              {/* 2024 - Fade in and slide up */}
              <div 
                className={`flex flex-col items-center flex-1 transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <div className="w-3 h-3 bg-black rounded-full z-10 mb-4"></div>
                <div className="text-center max-w-xs">
                  <div className="text-lg font-bold text-black mb-2">2024</div>
                  <p className="text-gray-800 font-medium mb-2 text-sm">Started Zone 01 Oujda</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Began intensive software development training, learning programming fundamentals and collaborative coding.
                  </p>
                </div>
              </div>

              {/* Present - Fade in and slide up */}
              <div 
                className={`flex flex-col items-center flex-1 transition-all duration-700 ${
                  animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                <div className="w-3 h-3 bg-black rounded-full z-10 mb-4"></div>
                <div className="absolute inline-flex w-3 h-3 rounded-full bg-black opacity-40 animate-ping"></div>

                <div className="text-center max-w-xs">
                  <div className="text-lg font-bold text-black mb-2">
                    Present
                  </div>
                  <p className="text-gray-800 font-medium mb-2 text-sm">Continuing My Journey</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Actively developing projects, expanding my skills, and building a strong portfolio in web development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}