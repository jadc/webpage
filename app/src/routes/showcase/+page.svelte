<script lang="ts">
    import Project from "$lib/Project.svelte";

    let { data } = $props();
</script>

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
