import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://moeenn.github.io",
  compressHTML: true,
  output: "static",
  build: {
    assets: "assets",
  },
  server: {
    port: 3000,
  }
});