export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", color: "from-cyan-500 to-blue-500" },
        { name: "Angular", color: "from-red-500 to-pink-500" },
        { name: "TypeScript", color: "from-blue-600 to-blue-400" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Spring Boot", color: "from-green-500 to-emerald-500" },
        { name: "Java", color: "from-orange-500 to-red-500" },
        { name: "Node.js", color: "from-green-600 to-green-400" },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", color: "from-blue-600 to-indigo-600" },
        { name: "MongoDB", color: "from-green-500 to-teal-500" },
        { name: "MySQL", color: "from-blue-500 to-cyan-500" },
      ]
    },
    {
      title: "DevOps",
      skills: [
        { name: "Docker", color: "from-blue-500 to-sky-500" },
        { name: "Kubernetes", color: "from-blue-600 to-purple-600" },
        { name: "CI/CD", color: "from-purple-500 to-pink-500" },
      ]
    },
    {
      title: "Version Control",
      skills: [
        { name: "Git", color: "from-orange-500 to-red-600" },
        { name: "GitHub", color: "from-gray-600 to-gray-800" },
        { name: "GitLab", color: "from-orange-600 to-red-500" },
      ]
    }
  ];

  return (
    <section id="tech" className="w-screen h-screen flex-shrink-0 bg-neutral-950 text-white flex items-center justify-center px-8 overflow-hidden relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-white">TECH</span>{" "}
            <span
              className="text-white/10"
              style={{
                letterSpacing: "-0.02em",
                WebkitTextStroke: "2px rgba(250, 250, 250, 0.6)",
              }}
            >
              STACK
            </span>
          </h1>
          <div className="h-px w-32 bg-white/80"></div>
        </div>

        {/* Skills Categories - Horizontal Layout */}
        <div className="flex gap-8 items-start">
          {categories.map((category, idx) => (
            <div key={idx} className="flex-1 min-w-0">
              {/* Category Title */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {category.title}
                </h3>
                <div className="h-px w-12 bg-white/30"></div>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="group cursor-pointer"
                  >
                    {/* Icon Placeholder + Skill Name */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      {/* Icon Circle */}
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex-shrink-0 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-6 h-6 bg-white/20 rounded backdrop-blur-sm"></div>
                      </div>
                      
                      {/* Skill Name */}
                      <span className="text-white font-medium text-sm">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8">
          <p className="text-gray-600 text-sm">
            Building with modern tools and best practices
          </p>
        </div>
      </div>
    </section>
  );
}