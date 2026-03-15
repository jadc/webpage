<script lang="ts">
    import Post from "$lib/Post.svelte";
    import { resolve } from "$app/paths";
    import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "$lib/meta";

    let { data } = $props();
</script>

<svelte:head>
    <title>{SITE_TITLE}</title>
    <meta name="description" content={SITE_DESCRIPTION} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_DESCRIPTION} />
    <meta property="og:url" content={SITE_URL} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={SITE_TITLE} />
    <meta name="twitter:description" content={SITE_DESCRIPTION} />
</svelte:head>

{#each data.posts as post (post.slug)}
    <Post
        title={post.title}
        description={post.description}
        date={post.date}
        tags={post.tags}
        thumbnail={post.thumbnail ? `/${post.slug}/${post.thumbnail}` : undefined}
        href={resolve(`/${post.slug}` as "/")}
    />
{/each}
