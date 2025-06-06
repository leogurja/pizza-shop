/// <reference types="vitest" />

import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		setupFiles: ["./test/setup.ts"],
		environment: "happy-dom",
		root: "./src",
		env: {
			VITE_API_URL: "/"
		}
	},
});
