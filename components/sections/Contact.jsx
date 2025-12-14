export default function Contact() {
  return (
 <section id="contact" className="w-screen h-screen flex-shrink-0 bg-white text-black relative flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Contact</h2>
            <p className="text-sm font-mono text-gray-600 uppercase tracking-widest">
              Let's work together
            </p>
          </div>
        </section>
  )
}
