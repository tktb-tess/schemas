/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
      fileName: 'bundle',
    },
    rollupOptions: {
      external: ['zod'],
    },
  },
  plugins: [dts()],
  test: {
    testTimeout: 15000,
  },
  server: {
    port: 8000,
  },
});
