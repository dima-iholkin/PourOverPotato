import fs from "fs";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5174,
    https: {
      key: fs.readFileSync(`${__dirname}/_cert/key.pem`),
      cert: fs.readFileSync(`${__dirname}/_cert/cert.pem`)
    },
    proxy: {}
  }
});