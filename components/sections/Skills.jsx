export default function Skills() {
  return (
        <section id="tech" className="w-screen h-screen flex-shrink-0 bg-neutral-950 text-white relative flex items-center justify-center">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Tech Stack</h2>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Spring Boot, Angular, Docker
            </p>
          </div>
        </section>
  )
}