/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom",
    root: "./src",
    env: {
      VITE_API_URL: "/",
    },
  },
});
