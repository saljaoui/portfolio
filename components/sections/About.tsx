export default function About() {
  return (
    <section className="w-screen h-screen flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-24 overflow-hidden">

 <div className="absolute -top-16 mx-auto w-32 h-32 rounded-full border-2 border-gray-200" />
          <div className="absolute -top-12 mx-auto w-24 h-24 rounded-full border-2 border-gray-300" />
          <div className="absolute -top-8 mx-auto w-16 h-16 rounded-full border-2 border-gray-400" />

      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-8">
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
            {/* Profile Picture - Left */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 shadow-xl flex items-center justify-center transition-transform hover:scale-105 duration-300 overflow-hidden border-1 border-gray-600">
                <img
                  src="../images/about_image.jpg"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content - Right */}
            <div className="flex-1">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h2>
          <div className="relative px-8">
            {/* Timeline Line */}
            <div className="absolute top-1.5 left-0 right-0 h-px bg-gray-300"></div>

            {/* Start Point */}
            <div className="absolute left-0 top-0 w-3 h-3 bg-white border-2 border-gray-300 rounded-full z-10"></div>

            {/* End Point */}
            <div className="absolute right-0 top-0 w-3 h-3 bg-white border-2 border-gray-300 rounded-full z-10"></div>

            {/* Timeline Items */}
            <div className="relative flex justify-between items-start gap-16">
              {/* 2023 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-3 h-3 bg-black rounded-full z-10 mb-4"></div>
                <div className="text-center max-w-xs">
                  <div className="text-lg font-bold text-black mb-2">2023</div>
                  <p className="text-gray-800 font-medium mb-2 text-sm">Baccalaureate Obtained</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Successfully completed high school education, laying the foundation for my tech journey.
                  </p>
                </div>
              </div>

              {/* 2024 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-3 h-3 bg-black rounded-full z-10 mb-4"></div>
                <div className="text-center max-w-xs">
                  <div className="text-lg font-bold text-black mb-2">2024</div>
                  <p className="text-gray-800 font-medium mb-2 text-sm">Started Zone 01 Oujda</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Began intensive software development training, learning programming fundamentals and collaborative coding.
                  </p>
                </div>
              </div>

              {/* Present */}
              <div className="flex flex-col items-center flex-1">
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