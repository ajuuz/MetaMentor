import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync("../certs/192.168.29.148-key.pem"),
      cert: fs.readFileSync("../certs/192.168.29.148.pem"),
    },
    host: "192.168.29.148",
    port: 5173,
  },
});
