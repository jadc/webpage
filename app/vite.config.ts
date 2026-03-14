import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { contentAssets } from "./src/lib/vite/content-assets.ts";

export default defineConfig({
    plugins: [contentAssets(), tailwindcss(), sveltekit()],
    server: {
        watch: {
            usePolling: true
        }
    }
});
