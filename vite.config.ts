import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          // dynamic import only in dev REPL env; safe to keep
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("@replit/vite-plugin-cartographer")?.cartographer?.()
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  assetsInclude: ["**/*.lottie"],

  // REQUIRED FOR VERCEL
  root: "client",

  build: {
    // IMPORTANT: output goes to top-level /dist so vercel can serve index.html
    outDir: "../dist",
    emptyOutDir: true
  }
});
