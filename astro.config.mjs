import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  site: 'https://tfukaza.github.io',
  base: '/harvest-website',
});