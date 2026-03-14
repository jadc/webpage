import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import { remarkRewriteAssets } from "./src/lib/remark/rewrite-assets.ts";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({ fallback: "404.html" }),
        paths: { base: process.argv.includes("dev") ? "" : process.env.BASE_PATH }
    },
    preprocess: [
        mdsvex({
            extensions: [".svx", ".md"],
            remarkPlugins: [remarkRewriteAssets]
        })
    ],
    extensions: [".svelte", ".svx", ".md"]
};

export default config;
