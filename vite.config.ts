/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

const fNames = ['main', 'comma_data', 'cotec_json', 'otm_json', 'zpdic'];

export default defineConfig({
  build: {
    lib: {
      entry: fNames.map((fName) => resolve(__dirname, `./lib/${fName}.ts`)),
      formats: ['es'],
      fileName: (_, fileName) => `${fileName}.js`,
    },
    rolldownOptions: {
      external: ['zod'],
    },
  },
  plugins: [dts()],
  test: {
    testTimeout: 30000,
  },
  server: {
    port: 8000,
  },
});
