import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "wouter";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "@/hooks/use-theme";

const LIGHT_LOTTIE =
  "https://lottie.host/f3ce1ed8-496f-4560-882d-dbd448cb03db/JCZbr3st4q.lottie";

const DARK_LOTTIE =
  "https://lottie.host/63019e5d-4fd3-4118-968d-9174639375a0/m0MgSq1b5m.lottie"; // <-- Replace with your dark mode animation

const RouteLoader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location] = useLocation();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme(); // 'light' or 'dark'

  const LOTTIE_URL = theme === "dark" ? DARK_LOTTIE : LIGHT_LOTTIE;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-white dark:bg-[#111827]">
        <DotLottieReact
          src={LOTTIE_URL}
          autoplay
          loop
          style={{ width: 500, height: 500 }}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteLoader;
