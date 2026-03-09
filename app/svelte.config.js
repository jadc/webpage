import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({ fallback: "404.html" }),
        paths: { base: process.argv.includes("dev") ? "" : process.env.BASE_PATH },
    },
	preprocess: [mdsvex()],
	extensions: [".svelte", ".svx"]
};

export default config;
