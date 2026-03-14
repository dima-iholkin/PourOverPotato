import fs from "fs";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 5174,
    host: true,
    https: {
      key: fs.readFileSync(`${__dirname}/_cert/key.pem`),
      cert: fs.readFileSync(`${__dirname}/_cert/cert.pem`)
    },
    proxy: {}
  }
});