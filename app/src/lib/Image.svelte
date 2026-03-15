<script lang="ts">
    import { resolve } from "$app/paths";

    let { src, alt = "", class: className = "" }: {
        src: string;
        alt?: string;
        class?: string;
    } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- src may be an external URL -->
<img src={src.startsWith("http") ? src : resolve(src as "/")} {alt} loading="lazy" class="mx-auto max-h-128 rounded object-contain {className}" />
