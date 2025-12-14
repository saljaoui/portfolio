export default function Hero() {
  return (
    <section className="w-screen h-screen flex-shrink-0 bg-black text-white overflow-hidden flex items-center justify-center relative">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold mb-4">Hero Section</h1>
        <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
          Scroll down to explore
        </p>
      </div>
    </section>
  )
}