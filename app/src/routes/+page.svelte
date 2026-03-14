<script lang="ts">
    import Post from "$lib/Post.svelte";
    import { resolve } from "$app/paths";

    let { data } = $props();
</script>

{#each data.posts as post (post.slug)}
    <Post
        title={post.title}
        description={post.description}
        date={post.date}
        tags={post.tags}
        thumbnail={post.thumbnail}
        href={resolve(`/${post.slug}` as "/")}
    />
{/each}
