import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	output: "static",
	build: {
		assets: "assets",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	server: {
		port: 3000,
	},
	markdown: {
		shikiConfig: {
			theme: "monokai",
		},
	},
});
