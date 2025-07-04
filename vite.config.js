import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

// Determine base dynamically
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/Admindash/" : "/", // 👈 Use correct base depending on env
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          })
        );
      },
    },
  ],
  server: {
    open: true,
  },
});
