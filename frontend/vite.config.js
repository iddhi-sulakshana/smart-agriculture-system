/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        assetsInclude: ["assets"],
    },
    server: {
        port: process.env.PORT || 5000,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.js",
        css: true,
    },
});
