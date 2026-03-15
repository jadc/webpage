import { GH_TOKEN } from "$env/static/private";
import { pinnedRepos } from "$lib/pinned";
import type { PageServerLoad } from "./$types";

const GITHUB_USER = "jadc";

// Fetches all public, non-fork repos owned by the user.
const QUERY = `
query($cursor: String) {
  user(login: "${GITHUB_USER}") {
    repositories(
      first: 100
      after: $cursor
      ownerAffiliations: OWNER
      privacy: PUBLIC
      isFork: false
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        description
        url
        isArchived
        pushedAt
        repositoryTopics(first: 20) {
          nodes {
            topic {
              name
            }
          }
        }
        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            node { name }
          }
        }
        openGraphImageUrl
        usesCustomOpenGraphImage
      }
    }
  }
}
`;

interface GraphQLResponse {
    data: {
        user: {
            repositories: {
                pageInfo: { hasNextPage: boolean; endCursor: string | null };
                nodes: RepoNode[];
            };
        };
    };
    errors?: { message: string }[];
}

interface RepoNode {
    name: string;
    description: string | null;
    url: string;
    isArchived: boolean;
    pushedAt: string;
    repositoryTopics: {
        nodes: { topic: { name: string } }[];
    };
    languages: {
        edges: { node: { name: string } }[];
    };
    openGraphImageUrl: string;
    usesCustomOpenGraphImage: boolean;
}



async function fetchAllRepos(fetch: typeof globalThis.fetch): Promise<RepoNode[]> {
    const repos: RepoNode[] = [];
    let cursor: string | null = null;

    while (true) {
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `bearer ${GH_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: QUERY,
                variables: { cursor }
            })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`GitHub GraphQL request failed (${res.status}): ${text}`);
        }

        const json: GraphQLResponse = await res.json();

        if (json.errors) {
            throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
        }

        const { nodes, pageInfo } = json.data.user.repositories;
        repos.push(...nodes);

        if (!pageInfo.hasNextPage) break;
        cursor = pageInfo.endCursor;
    }

    return repos;
}

// Transforms a GraphQL repo node into the shape expected by the Project component.
function toRepo(r: RepoNode) {
    const tags = r.repositoryTopics.nodes.map((t) => t.topic.name).sort();
    const languages = r.languages.edges.map((e) => e.node.name);

    return {
        title: r.name,
        description: r.description ?? "",
        href: r.url,
        tags,
        languages,
        thumbnail: r.usesCustomOpenGraphImage ? r.openGraphImageUrl : undefined
    };
}

export const load: PageServerLoad = async ({ fetch }) => {
    const allRepos = await fetchAllRepos(fetch);
    const active = allRepos.filter((r) => !r.isArchived);

    const pinned = pinnedRepos
        .map((name) => active.find((r) => r.name === name))
        .filter((r): r is RepoNode => r !== undefined);
    const pinnedNames = new Set(pinnedRepos);
    const rest = active.filter((r) => !pinnedNames.has(r.name));

    // Pinned repos appear first, then the rest.
    const repos = [...pinned.map(toRepo), ...rest.map(toRepo)];

    return { repos };
};
