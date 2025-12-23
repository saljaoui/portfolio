import { useEffect, useState } from "react";

interface LoadingState {
  loading: boolean;
  loadingProgress: number;
  mounted: boolean;
  animate: boolean;
}

export const useLoadingAnimation = (activeSection: boolean) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    loadingProgress: 0,
    mounted: false,
    animate: false,
  });

  // Loading sequence - only on initial mount
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingState((prevState) => {
        const newProgress = prevState.loadingProgress + 2;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingState((state) => ({
              ...state,
              loading: false,
              mounted: true,
              animate: true,
            }));
          }, 500);
          return { ...prevState, loadingProgress: 100 };
        }

        return { ...prevState, loadingProgress: newProgress };
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Handle section active state
  useEffect(() => {
    if (!loadingState.loading) {
      if (activeSection) {
        setLoadingState((prevState) => ({
          ...prevState,
          animate: false,
        }));

        const t = setTimeout(() => {
          setLoadingState((prevState) => ({
            ...prevState,
            animate: true,
          }));
        }, 50);

        return () => clearTimeout(t);
      } else {
        setLoadingState((prevState) => ({
          ...prevState,
          animate: false,
        }));
      }
    }
  }, [activeSection, loadingState.loading]);

  return loadingState;
};
