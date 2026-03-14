import type { Component } from "svelte";

// Frontmatter fields defined in each post's index.md.
export type PostFrontmatter = {
    title: string;
    description: string;
    date: string;
    tags: string[];
    thumbnail?: string;
};

// Frontmatter plus the slug derived from the directory name.
export type PostMeta = PostFrontmatter & { slug: string };

// Each module contains the compiled Markdown -> Svelte component and YAML frontmatter.
const postModules = import.meta.glob<{
    default: Component;
    metadata: PostFrontmatter;
}>("/src/content/posts/*/index.md", { eager: true });

// Returns metadata for all posts, sorted by date descending.
export function getPosts(): PostMeta[] {
    const posts: PostMeta[] = [];

    for (const [path, mod] of Object.entries(postModules)) {
        // Derive slug from the parent directory name in the path.
        const slug = path.split("/").at(-2)!;
        posts.push({ ...mod.metadata, slug });
    }

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

// Returns the compiled component and metadata for a single post by slug.
export function getPost(slug: string) {
    const path = `/src/content/posts/${slug}/index.md`;
    const mod = postModules[path];

    if (!mod) {
        throw new Error(`Post not found: ${slug}`);
    }

    return {
        component: mod.default,
        meta: { ...mod.metadata, slug } as PostMeta
    };
}
