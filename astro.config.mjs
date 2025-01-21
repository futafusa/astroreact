// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import glsl from 'vite-plugin-glsl';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [glsl()],
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[ext]/[name][extname]',
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          manualChunks: {
            'vendor': ['three', '@react-three/fiber', '@react-three/drei'],
            'app': ['./src/components/']
          }
        }
      }
    }
  },
  compressHTML: false,
  build: {
    inlineStylesheets: 'never',
    assets: 'assets',
  }
});
