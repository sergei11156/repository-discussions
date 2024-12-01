import {getOctokit} from "../shared/githubClient.js";
import {compareWithAgeLimit} from "../shared/compareWithAgeLimit.js";

const query = `
  query($repoOwner: String!, $repoName: String!, $pageSize: Int = 100, $cursor: String) {
      repository(owner: $repoOwner, name: $repoName) {
        issues(first: $pageSize, after: $cursor, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            title
            number
            createdAt
            url
            state
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

export const loadIssues = async (repository, update) => {
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
            const prs = response.repository.issues.nodes;
            PRs.push(...prs)
            repository.issues = PRs;
            await repository.save()
            update(PRs.length)

            hasNextPage = response.repository.issues.pageInfo.hasNextPage &&
                compareWithAgeLimit(new Date(prs[prs.length - 1].createdAt));
            cursor = response.repository.issues.pageInfo.endCursor;
        } catch (error) {
            console.error("Error fetching data:", error);
            return;
        }
    }
}