import { getPosts, getPost } from "$lib/posts";
import type { PageLoadEvent } from "./$types";

export function load({ params }: PageLoadEvent) {
    return getPost(params.slug);
}

// Tells SvelteKit which [slug] values exist so it can prerender
// a static HTML page for each post at build time.
export function entries() {
    return getPosts().map(post => ({ slug: post.slug }));
}
