<script lang="ts">
    import Project from "$lib/Project.svelte";
    import { SITE_URL, SITE_TITLE } from "$lib/meta";

    let { data } = $props();

    const title = `Showcase - ${SITE_TITLE}`;
    const description = "A showcase of my projects.";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="{SITE_URL}/showcase" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
</svelte:head>

{#each data.repos as repo (repo.href)}
    <Project
        title={repo.title}
        description={repo.description}
        tags={repo.tags}
        languages={repo.languages}
        thumbnail={repo.thumbnail}
        href={repo.href}
    />
{/each}
