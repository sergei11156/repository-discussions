import {getOctokit} from "../shared/githubClient.js";

const query = `
  query($repoOwner: String!, $repoName: String!, $pageSize: Int = 100, $cursor: String) {
    repository(owner: $repoOwner, name: $repoName) {
      pullRequests(first: $pageSize, after: $cursor, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          title
          number
          createdAt
          url
          state
          reviews {
            totalCount
          }
          comments {
            totalCount
          }
        }
        pageInfo {
            hasNextPage
            endCursor
        }
      }
    }
  }
  `;

export const loadPullRequests = async (repository, update) => {
    let hasNextPage = true;
    let cursor = null;
    const PRs = [];
    while (hasNextPage) {
        try {
            const response = await getOctokit().graphql(query, {
                repoOwner: repository.owner,
                repoName: repository.name,
                pageSize: 100,
                cursor,
            });

            PRs.push(...response.repository.pullRequests.nodes)
            repository.pullRequests = PRs;
            await repository.save()
            update(PRs.length)

            hasNextPage = response.repository.pullRequests.pageInfo.hasNextPage;
            cursor = response.repository.pullRequests.pageInfo.endCursor;
        } catch (error) {
            console.error("Error fetching data:", error);
            return;
        }
    }
}