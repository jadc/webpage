import type { PageLoad } from "./$types";
import { showcaseRepos } from "$lib/showcase";

interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    topics: string[];
    language: string | null;
    archived: boolean;
    owner: { login: string };
}

async function fetchAllRepos(fetch: typeof globalThis.fetch): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = [];
    let page = 1;

    while (true) {
        const res = await fetch(`https://api.github.com/users/jadc/repos?per_page=100&page=${page}`);
        if (!res.ok) break;

        const r: GitHubRepo[] = await res.json();
        if (repos.length === 0) break;

        repos.push(...r);
        page++;
    }

    return repos;
}

export const load: PageLoad = async ({ fetch }) => {
    const allRepos = await fetchAllRepos(fetch);

    const repos = showcaseRepos
        .map((entry) => {
            const data = allRepos.find(
                (r) => `${r.owner.login}/${r.name}` === entry.repo
            );
            if (!data || data.archived) return null;

            const topics = data.topics ?? [];
            const language = data.language?.toLowerCase().replace(/\s+/g, "-");
            const tags = [...new Set([...topics, language].filter(Boolean))].sort();

            return {
                title: data.name,
                description: data.description ?? "",
                href: data.html_url,
                tags,
                thumbnail: entry.thumbnail
            };
        })
        .filter((r) => r !== null);

    return { repos };
};
