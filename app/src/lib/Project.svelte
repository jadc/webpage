<script lang="ts">
    import Image from "$lib/Image.svelte";

    let { title, description, href = "#", tags = [], languages = [], thumbnail }: {
        title: string;
        description: string;
        href?: string;
        tags?: string[];
        languages?: string[];
        thumbnail?: string;
    } = $props();

    const deviconName: Record<string, string> = {
        "C#": "csharp",
        "C++": "cplusplus",
        "CSS": "css3",
        "Dockerfile": "docker",
        "F#": "fsharp",
        "HTML": "html5",
        "Jupyter Notebook": "jupyter",
        "Nix": "nixos",
        "Objective-C": "objectivec",
        "Objective-C++": "objectivec",
        "SCSS": "sass",
        "Shell": "bash",
        "Vim Script": "vim",
        "Vue": "vuejs",
    };

    function deviconClass(lang: string): string {
        const name = deviconName[lang] ?? lang.toLowerCase().replace(/\s+/g, "");
        return `devicon-${name}-plain`;
    }
</script>

<article class="py-6 border-b border-main-700 grid grid-cols-[1fr_auto] gap-x-6 gap-y-3">
    <div>
        <h2 class="font-bold">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
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
    </div>
    <div class="text-right text-sm">
        {#if languages.length > 0}
            <ul class="list-none p-0 flex flex-col items-end gap-1">
                {#each languages as lang (lang)}
                    <li class="text-main-300"><i class={deviconClass(lang)}></i> {lang}</li>
                {/each}
            </ul>
        {/if}
    </div>
    {#if thumbnail}
        <Image src={thumbnail} class="col-span-2" />
    {/if}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a {href} class="col-span-2 text-main-400 hover:text-white text-sm">
        Read more &rarr;
    </a>
</article>
