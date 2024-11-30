import {getOctokit} from "../shared/githubClient.js";

export const loadPullRequestCommentsCount = async (repository) => {

    for (const issue of repository.pullRequests) {
        const result = await getOctokit().rest.pulls.get({
            ...repository.getOwnerAndRepoObj(),
            pull_number: issue.number
        });
        issue.setCommentsCount(result.data.comments);
    }
    return await repository.save()
}