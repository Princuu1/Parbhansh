// src/components/SplashScreen.tsx
import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface SplashScreenProps {
  duration?: number;       // how long to show the splash (ms)
  onFinish: () => void;    // notify parent when done
}

const LOTTIE_URL =
  "https://lottie.host/ef16d61a-79c2-4ffa-abda-0a8cc9f5b6b5/XaXxPo5FGH.lottie";

const SplashScreen: React.FC<SplashScreenProps> = ({ duration = 2000, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <DotLottieReact
        src={LOTTIE_URL}
        autoplay
        loop={false}
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
};

export default SplashScreen;
