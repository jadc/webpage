// Remark plugin for mdsvex that rewrites markdown relative URLs to absolute.

import { visit } from "unist-util-visit";
import type { Node } from "unist";

interface VFile {
    filename?: string;
    history?: string[];
}

interface UrlNode extends Node {
    url?: string;
}

const base = process.env.BASE_PATH ?? "";

export function remarkRewriteAssets() {
    return (tree: Node, file: VFile) => {
        // Derive the post slug from the file path.
        const filename = file.filename ?? file.history?.[0];
        if (!filename) return;

        const match = filename.match(/\/content\/[^/]+\/([^/]+)\//);
        if (!match) return;
        const slug = match[1];

        // Rewrite relative ./paths on image and link nodes.
        visit(tree, (node: Node) => {
            const n = node as UrlNode;
            if (n.type === "image" && n.url?.startsWith("./")) {
                n.url = `${base}/${slug}/${n.url.slice(2)}`;
            }
            if (n.type === "link" && n.url?.startsWith("./")) {
                n.url = `${base}/${slug}/${n.url.slice(2)}`;
            }
        });
    };
}
