<script lang="ts">
    import { resolve } from "$app/paths";
    import Image from "$lib/Image.svelte";

    let { title, description, href = "#", date, tags = [], thumbnail }: {
        title: string;
        description: string;
        href?: string;
        date: string;
        tags?: string[];
        thumbnail?: string;
    } = $props();
</script>

<article class="py-6 border-b border-main-700 grid grid-cols-[1fr_auto] gap-x-6 gap-y-3">
    <div>
        <h2 class="font-bold">
            <a href={resolve(href as "/")} class="text-white no-underline hover:underline">{title}</a>
        </h2>
        <p class="text-main-300 mt-2">{description}</p>
    </div>
    <div class="text-right text-sm">
        <time class="text-main-400">{date}</time>
        {#if tags.length > 0}
            <ul class="mt-2 list-none p-0 flex flex-col items-end gap-1">
                {#each tags as tag (tag)}
                    <li class="text-main-500">#{tag}</li>
                {/each}
            </ul>
        {/if}
    </div>
    {#if thumbnail}
        <Image src="{href}/{thumbnail}" class="col-span-2" />
    {/if}
    <a href={resolve(href as "/")} class="col-span-2 text-main-400 hover:text-white text-sm">
        Read more &rarr;
    </a>
</article>
