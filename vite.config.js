import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

export default defineConfig({
  base: "/Admindash/", // 🔁 Replace with your GitHub repo name
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
