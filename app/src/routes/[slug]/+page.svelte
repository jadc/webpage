<script lang="ts">
    import { resolve } from "$app/paths";
    import Image from "$lib/Image.svelte";
    import { SITE_URL, SITE_TITLE } from "$lib/meta";

    let { data } = $props();

    const url = $derived(`${SITE_URL}/${data.meta.slug}`);
    const image = $derived(data.meta.thumbnail ? `${SITE_URL}/${data.meta.slug}/${data.meta.thumbnail}` : undefined);
</script>

<svelte:head>
    <title>{data.meta.title} - {SITE_TITLE}</title>
    <meta name="description" content={data.meta.description} />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
    <meta property="og:url" content={url} />
    {#if image}
        <meta property="og:image" content={image} />
    {/if}

    <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={data.meta.title} />
    <meta name="twitter:description" content={data.meta.description} />
    {#if image}
        <meta name="twitter:image" content={image} />
    {/if}

    <meta property="article:published_time" content={new Date(data.meta.date).toISOString()} />
</svelte:head>

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
