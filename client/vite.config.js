// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // We'll run the client on port 3000
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Your backend server
        changeOrigin: true,
      },
    },
  },
});
