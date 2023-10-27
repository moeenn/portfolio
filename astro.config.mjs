import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  site: "https://moeenn.github.io",
  compressHTML: true,
  output: "static",
  build: {
    assets: "assets",
  }
});