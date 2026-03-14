// Vite plugin that serves assets co-located with markdown content.
// Content lives in src/content/<category>/<slug>/ alongside images and
// other attachments. This plugin makes those assets available at
// /<slug>/<filename> — both during dev and in the final build.

import { type Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { lookup } from "mrmime";

const contentDir = path.resolve("src/content");

// Returns all <slug>/<filename> entries across every content subdirectory.
function getAssetEntries(): { slug: string; file: string; absPath: string }[] {
    if (!fs.existsSync(contentDir)) return [];

    const entries: { slug: string; file: string; absPath: string }[] = [];

    for (const category of fs.readdirSync(contentDir)) {
        const categoryDir = path.join(contentDir, category);
        if (!fs.statSync(categoryDir).isDirectory()) continue;

        for (const slug of fs.readdirSync(categoryDir)) {
            const slugDir = path.join(categoryDir, slug);
            if (!fs.statSync(slugDir).isDirectory()) continue;

            for (const file of fs.readdirSync(slugDir)) {
                if (file.endsWith(".md")) continue;
                entries.push({ slug, file, absPath: path.join(slugDir, file) });
            }
        }
    }

    return entries;
}

export function contentAssets(): Plugin {
    return {
        name: "content-assets",
        // Dev: intercept /<slug>/<file> requests and serve the
        // corresponding file from the content directory.
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const match = req.url?.match(/^\/([^/]+)\/([^/]+)$/);
                if (!match) return next();

                const [, slug, filename] = match;
                const entry = getAssetEntries().find(
                    (e) => e.slug === slug && e.file === filename
                );

                if (entry) {
                    const mime = lookup(filename) ?? "application/octet-stream";
                    res.setHeader("Content-Type", mime);
                    fs.createReadStream(entry.absPath).pipe(res);
                } else {
                    next();
                }
            });
        },
        // Build: copy all non-markdown assets from each content
        // directory into the build output at <slug>/.
        writeBundle(options) {
            const outDir = options.dir ?? "build";

            for (const { slug, file, absPath } of getAssetEntries()) {
                const destDir = path.join(outDir, slug);
                fs.mkdirSync(destDir, { recursive: true });
                fs.copyFileSync(absPath, path.join(destDir, file));
            }
        }
    };
}
