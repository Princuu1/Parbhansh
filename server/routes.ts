import express, { Request, Response, NextFunction, type Express } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger, type InlineConfig } from "vite";
import { nanoid } from "nanoid";
import { registerRoutes } from "./routes";
import { Server } from "http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const viteLogger = createLogger();

function log(message: string, source = "server") {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} [${source}] ${message}`);
}

async function setupVite(app: Express, httpServer: Server) {
  const vite = await createViteServer({
    configFile: path.resolve(__dirname, "../vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: { server: httpServer },
      allowedHosts: true,
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const templatePath = path.resolve(__dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(templatePath, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err as Error);
      next(err);
    }
  });
}

function serveStatic(app: Express) {
  const staticPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(staticPath)) {
    throw new Error(`Build folder not found at ${staticPath}`);
  }

  app.use(express.static(staticPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

(async () => {
  const app: Express = express();
  const httpServer = new Server(app);

  // 🔁 301 REDIRECT (Render → Vercel) ✅
  app.use((req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host;

    // only redirect traffic coming to onrender.com
    if (host && host.includes("onrender.com")) {
      return res.redirect(
        301,
        `https://parbhansh.vercel.app${req.originalUrl}`
      );
    }

    next();
  });

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Request logging
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let jsonResponse: any;

    const originalJson = res.json;
    res.json = function (body: any) {
      jsonResponse = body;
      return originalJson.apply(this, arguments as any);
    };

    res.on("finish", () => {
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${Date.now() - start}ms`;
        if (jsonResponse) logLine += ` :: ${JSON.stringify(jsonResponse)}`;
        if (logLine.length > 120) logLine = logLine.slice(0, 119) + "…";
        log(logLine);
      }
    });

    next();
  });

  // Register API routes (email, contact, etc.)
  await registerRoutes(app);

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Server Error:", err);
    res.status(err.status || 500).json({ message: err.message || "Internal Error" });
  });

  if (isProduction) {
    serveStatic(app);
  } else {
    await setupVite(app, httpServer);
  }

  httpServer.listen(PORT, () => {
    log(`Server running on http://localhost:${PORT}`);
  });
})();
