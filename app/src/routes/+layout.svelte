<script lang="ts">
    import "./layout.css";
    import { asset, resolve } from "$app/paths";
    import { page } from "$app/state";
    const logo = asset("/icons/logo.svg");

    const navLinks = [
        ["/", "Posts"],
        ["/showcase", "Showcase"],
    ] as const;

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>

<div class="mx-auto grid min-h-svh max-w-2xl grid-rows-[auto_1fr] px-6 py-12">
    <header class="pb-12 flex justify-between items-center gap-6">
        <a href={resolve("/")} class="flex items-center gap-4 text-white text-xl font-bold bg-main-800 px-4 py-2 no-underline hover:underline">
            <img src={logo} alt="" class="h-8 w-auto" />
            jad
        </a>
        <ul class="flex gap-6 items-center list-none p-0">
            {#each navLinks as [href, label] (href)}
                <li><a href={resolve(href as "/")} class="{page.url.pathname === href ? 'text-white' : 'text-main-400 hover:text-white'}">{label}</a></li>
            {/each}
        </ul>
    </header>

    <main>
        {@render children()}
    </main>
</div>
