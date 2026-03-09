<script lang="ts">
    import "./layout.css";
    import { asset, resolve } from "$app/paths";
    const logo = asset("/icons/logo.svg");

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>

<div class="mx-auto grid min-h-svh max-w-2xl grid-rows-[auto_1fr_auto] px-6 py-12">
    <header class="pb-12 flex items-center gap-6">
        <h1 class="text-2xl font-bold bg-bg-800 px-4 py-2 rounded-md">
            <a href={resolve("/")} class="flex items-center gap-4 text-white no-underline hover:underline">
                <img src={logo} alt="" class="h-8 w-auto" />
                jad
            </a>
        </h1>
        <nav class="">
            <ul class="flex gap-6 items-center list-none p-0">
                <li><a href={resolve("/")} class="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="https://github.com/jadc" class="text-gray-400 hover:text-white">GitHub</a></li>
            </ul>
        </nav>
    </header>

    <main>
        {@render children()}
    </main>
</div>
