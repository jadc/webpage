<script lang="ts">
    import Image from "$lib/Image.svelte";

    let { title, description, href = "#", tags = [], thumbnail }: {
        title: string;
        description: string;
        href?: string;
        tags?: string[];
        thumbnail?: string;
    } = $props();
</script>

<article class="py-6 border-b border-main-700">
    <h2 class="font-bold">
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is pre-resolved by callers -->
        <a {href} class="text-white no-underline hover:underline">{title}</a>
    </h2>
    <p class="text-main-300 mt-2">{description}</p>
    {#if tags.length > 0}
        <ul class="mt-2 list-none p-0 flex flex-wrap gap-2 text-sm">
            {#each tags as tag (tag)}
                <li class="text-main-500">#{tag}</li>
            {/each}
        </ul>
    {/if}
    {#if thumbnail}
        <Image src={thumbnail} class="mt-3" />
    {/if}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is pre-resolved by callers -->
    <a {href} class="inline-block mt-3 text-main-400 hover:text-white text-sm">
        Read more &rarr;
    </a>
</article>
