import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/use-theme"; // adjust path as needed

export default function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // Access custom theme context

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/particles.js";
    script.async = true;

    script.onload = () => {
      if (window.particlesJS) {
        const configPath =
          theme === "dark"
             ? "/particlesjs-config.json"
            : "/particlesjs-config (1).json";

        window.particlesJS.load(
          "particles-container",
          configPath,
          () => {
            console.log(`Particles.js loaded: ${configPath}`);
          }
        );
      } else {
        console.error("particlesJS is not available on window.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load particles.js");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [theme]); // 👈 re-run when theme changes

  return (
    <div
      id="particles-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
}
