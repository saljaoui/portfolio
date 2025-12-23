import { FC } from "react";

interface LoadingScreenProps {
  loading: boolean;
  loadingProgress: number;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  loading,
  loadingProgress,
}) => {
  return (
    <div
      className={`absolute w-screen h-screen inset-0 bg-black z-50 flex items-center justify-center transition-all duration-700 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="h-10 w-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            onError={(e) => {
              console.warn("Logo image failed to load");
            }}
          />
        </div>
        <div className="w-64 h-0.5 bg-white/20 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <p className="text-white/60 text-sm tracking-widest">
          {loadingProgress}%
        </p>
      </div>
    </div>
  );
};
