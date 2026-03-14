<script lang="ts">
    import { resolve } from "$app/paths";
    import Image from "$lib/Image.svelte";

    let { data } = $props();
</script>

<article class="py-6">
    <header class="mb-8 border-b border-main-700 pb-6">
        <h1 class="text-2xl font-bold">{data.meta.title}</h1>
        <div class="mt-3 flex items-center gap-4 text-sm text-main-400">
            <time>{data.meta.date}</time>
            {#each data.meta.tags as tag (tag)}
                <span>#{tag}</span>
            {/each}
        </div>
        {#if data.meta.thumbnail}
            <Image src="/{data.meta.slug}/{data.meta.thumbnail}" class="mt-4" />
        {/if}
    </header>
    <div class="prose prose-invert max-w-none prose-a:text-main-400 prose-a:hover:text-white prose-headings:text-white prose-p:text-main-200 prose-strong:text-white prose-code:text-main-300">
        <data.component />
    </div>
    <footer class="mt-8 border-t border-main-700 pt-6">
        <a href={resolve("/")} class="text-main-400 hover:text-white text-sm">&larr; Back to posts</a>
    </footer>
</article>
