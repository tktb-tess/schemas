/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      formats: ['es'],
    },
  },
  plugins: [dts()],
  test: {
    environment: 'node',
  },
});
