/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
      fileName: 'main',
    },
    rollupOptions: {
      external: ['zod'],
      output: {
        globals: {
          zod: 'z',
        },
      },
    },
  },
  plugins: [dts()],

  test: {
    environment: 'node',
  },
});
