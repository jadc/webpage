<script lang="ts">
    import Image from "$lib/Image.svelte";

    let { title, description, href = "#", date, tags = [], thumbnail }: {
        title: string;
        description: string;
        href?: string;
        date?: string;
        tags?: string[];
        thumbnail?: string;
    } = $props();
</script>

<article class="py-6 border-b border-main-700 grid grid-cols-[1fr_auto] gap-x-6 gap-y-3">
    <div>
        <h2 class="font-bold">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is pre-resolved by callers -->
            <a {href} class="text-white no-underline hover:underline">{title}</a>
        </h2>
        <p class="text-main-300 mt-2">{description}</p>
    </div>
    <div class="text-right text-sm">
        {#if date}
            <time class="text-main-400">{date}</time>
        {/if}
        {#if tags.length > 0}
            <ul class="mt-2 list-none p-0 flex flex-col items-end gap-1">
                {#each tags.slice(0, 5) as tag (tag)}
                    <li class="text-main-500">#{tag}</li>
                {/each}
            </ul>
        {/if}
    </div>
    {#if thumbnail}
        <Image src={thumbnail} class="col-span-2" />
    {/if}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is pre-resolved by callers -->
    <a {href} class="col-span-2 text-main-400 hover:text-white text-sm">
        Read more &rarr;
    </a>
</article>
