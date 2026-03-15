// Each entry has a repo ("owner/repo") and an optional thumbnail URL.
export type ShowcaseEntry = {
    repo: string;
    thumbnail?: string;
};

// GitHub repos to display on the showcase page.
export const showcaseRepos: ShowcaseEntry[] = [
    { repo: "jadc/.nixcfg" },
    { repo: "jadc/nvim" },
    { repo: "jadc/homelab" },
    { repo: "jadc/wot-skins" },
    { repo: "jadc/webpage" },
    { repo: "jadc/gleamdasher" },
    { repo: "jadc/jame" },
    { repo: "jadc/minecraft-servers" },
    { repo: "jadc/modpack-manifest-generator", thumbnail: "https://i.imgur.com/sSSJuMi.png" },
    { repo: "jadc/tracker" },
    { repo: "jadc/cuda-raytracer" },
    { repo: "jadc/homelab-old" },
    { repo: "jadc/raytracer" },
    { repo: "jadc/wot-skins-static" },
    { repo: "jadc/redpin" },
    { repo: "jadc/opengl" },
    { repo: "jadc/audio2yt" },
    { repo: "jadc/site" },
    { repo: "jadc/ElytraFlight" },
    { repo: "jadc/lab-theme" },
    { repo: "jadc/NoJumpscare" },
];
