// Remark plugin for mdsvex that rewrites markdown relative URLs to absolute.

import { visit } from "unist-util-visit";

const base = process.env.BASE_PATH ?? "";

export function remarkRewriteAssets() {
    return (tree, file) => {
        // Derive the post slug from the file path.
        const filename = file.filename ?? file.history?.[0];
        if (!filename) return;

        const match = filename.match(/\/content\/[^/]+\/([^/]+)\//);
        if (!match) return;
        const slug = match[1];

        // Rewrite relative ./paths on image and link nodes.
        visit(tree, (node) => {
            if (node.type === "image" && node.url?.startsWith("./")) {
                node.url = `${base}/${slug}/${node.url.slice(2)}`;
            }
            if (node.type === "link" && node.url?.startsWith("./")) {
                node.url = `${base}/${slug}/${node.url.slice(2)}`;
            }
        });
    };
}
