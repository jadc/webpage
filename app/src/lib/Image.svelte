<script lang="ts">
    import { resolve } from "$app/paths";

    let { src, alt = "", class: className = "" }: {
        src: string;
        alt?: string;
        class?: string;
    } = $props();
</script>

<img src={resolve(src as "/")} {alt} class="mx-auto max-h-128 rounded object-contain {className}" />
