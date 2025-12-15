export default function Projects() {
  return (
        <section id="projects" className="w-screen h-screen flex-shrink-0 bg-black text-white relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Projects</h2>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              01Blog, Portfolio, More
            </p>
          </div>
        </section>
  )
}