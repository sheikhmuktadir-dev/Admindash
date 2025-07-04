import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

export default defineConfig({
  base: "/Admindash/", // ✅ this must match your repo name exactly
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
