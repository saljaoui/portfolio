import { FC } from "react";

interface HeroContentProps {
  mounted: boolean;
  animate: boolean;
}

export const HeroContent: FC<HeroContentProps> = ({ mounted, animate }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-between px-12 z-10">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start pl-12">
        {/* Open to Work Badge */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
            mounted && animate ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <p className="text-white/60 text-xs tracking-widest">
            OPEN TO WORK
          </p>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-6xl font-semibold text-white mb-4 transition-all duration-700 ${
            mounted && animate ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
          style={{
            letterSpacing: "-0.02em",
            transitionDelay: "100ms",
          }}
        >
          FULL <span className="font-sans font-semibold">STACK</span>
        </h1>

        {/* Subheading */}
        <h1
          className={`text-6xl font-medium text-white/10 mb-10 transition-all duration-700 ${
            mounted && animate ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
          style={{
            letterSpacing: "-0.02em",
            WebkitTextStroke: "1px rgba(255,255,255,0.4)",
            transitionDelay: "200ms",
          }}
        >
          DEVELOPER
        </h1>

        {/* Download Resume Text */}
        <p
          className={`text-white/40 text-xs tracking-wider mt-8 transition-all duration-700 ${
            mounted && animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          /// DOWNLOAD RESUME
        </p>

        {/* Language Buttons */}
        <div
          className={`flex gap-4 mt-4 transition-all duration-700 ${
            mounted && animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <button className="px-3 py-3 border border-white/30 bg-white text-black text-sm transition-all hover:scale-105 flex gap-2">
            ENGLISH VERSION
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M12.25 2.834c-.46-.078-1.088-.084-2.22-.084c-1.917 0-3.28.002-4.312.14c-1.012.135-1.593.39-2.016.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.29v4c0 1.906.002 3.26.14 4.288c.135 1.006.389 1.586.812 2.01c.423.422 1.003.676 2.009.811c1.028.139 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-.437c0-1.536-.01-2.264-.174-2.813h-3.13c-1.133 0-2.058 0-2.79-.098c-.763-.103-1.425-.325-1.954-.854c-.529-.529-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79V2.835Zm1.5.776V5c0 1.2.002 2.024.085 2.643c.08.598.224.891.428 1.094c.203.204.496.348 1.094.428c.619.083 1.443.085 2.643.085h2.02a45.815 45.815 0 0 0-1.17-1.076l-3.959-3.563A37.2 37.2 0 0 0 13.75 3.61Zm-3.575-2.36c1.385 0 2.28 0 3.103.315c.823.316 1.485.912 2.51 1.835l.107.096l3.958 3.563l.125.112c1.184 1.065 1.95 1.754 2.361 2.678c.412.924.412 1.954.411 3.546v.661c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V9.944c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.75-.749 1.701-1.08 2.878-1.238c1.144-.153 2.607-.153 4.455-.153h.202Z" />
                <path d="M7.987 19.047a.75.75 0 0 0 1.026 0l2-1.875a.75.75 0 0 0-1.026-1.094l-.737.69V13.5a.75.75 0 1 0-1.5 0v3.269l-.737-.691a.75.75 0 1 0-1.026 1.094l2 1.875Z" />
              </g>
            </svg>
          </button>
          <button className="px-3 py-3 border border-white/40 text-white/60 text-sm transition-all hover:bg-white/10 hover:border-white hover:text-white hover:scale-105 flex">
            FRANÇAIS
          </button>
        </div>
      </div>

      {/* Center - Profile Image */}
      <div className="flex-shrink-0 relative">
        <div
          className={`relative w-[300px] h-[450px] lg:w-[500px] lg:h-[550px] group transition-all duration-1000 ${
            mounted && animate
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
          style={{
            perspective: "1000px",
            transitionDelay: "300ms",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src="/images/my_image.png"
              alt="Soufian ALJAOUI"
              className="w-full h-full object-contain rounded-lg shadow-2xl scale-x-[-1]"
              style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
              onError={(e) => {
                console.warn("Profile image failed to load");
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-end pr-12 text-right">
        {/* Description */}
        <p
          className={`text-white/60 text-sm leading-relaxed max-w-md mb-8 transition-all duration-700 ${
            mounted && animate ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Building seamless digital experiences where solid
          <br />
          full-stack engineering meets thoughtful UI/UX
          <br />
          design. Based in morocco.
        </p>

        {/* More About Me Button */}
        <button
          className={`px-8 py-4 border border-white/30 text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all mb-16 flex items-center gap-4 hover:scale-105 ${
            mounted && animate ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          MORE ABOUT ME
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16.66 9.353c1.787 1.154 1.787 4.14 0 5.294L5.87 21.614C4.135 22.736 2 21.276 2 18.968V5.033c0-2.31 2.134-3.769 3.87-2.648l10.79 6.968Z" />
              <path strokeLinecap="round" d="M22 5v14" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
