import {getOctokit} from "../shared/githubClient.js";

export const loadPullRequests = async (repository, update) => {
    const octokit = getOctokit();
    const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
        ...repository.getOwnerAndRepoObj(),
        state: "all",
        per_page: 100
    });

    for await (const { data: pullRequests } of iterator) {
        for (const pullRequest of pullRequests) {
            repository.addPullRequest(pullRequest);
        }
        update(repository.getPullRequestsCount())
        await repository.save();
    }
}