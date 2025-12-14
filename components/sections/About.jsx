export default function About() {
  return (
    <section className="min-w-svw">
      <div className="">
        {/* Panel 1 */}
        <div className="horizontal-panel bg-gradient-to-br from-pink-500 to-red-500">
          <h2 className="text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-white max-w-2xl text-center px-8">
            I'm a passionate web developer with expertise in modern technologies
          </p>
        </div>

        {/* Panel 2 */}
        <div className="horizontal-panel bg-gradient-to-br from-red-500 to-orange-500">
          <h2 className="text-6xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-xl text-white max-w-2xl text-center px-8">
            Started coding in 2020 and never looked back
          </p>
        </div>
      </div>
    </section>
  )
}