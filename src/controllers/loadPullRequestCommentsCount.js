import {getOctokit} from "../shared/githubClient.js";

export const loadPullRequestCommentsCountInRepository = async (repository, updateProgress) => {
    let loadedPRs = 0;
    for (const issue of repository.pullRequests) {
        updateProgress(Math.round((loadedPRs / repository.pullRequests.length) * 100), issue.title);
        const count = await loadPullRequestCommentsCount(repository, issue.number);
        issue.setCommentsCount(count);
        loadedPRs++;
        if (loadedPRs % 100 === 0) {
            await repository.save();
        }
    }
    return await repository.save()
}

export const loadPullRequestCommentsCount = async (repository, issueNumber) => {
    const result = await getOctokit().rest.pulls.get({
        ...repository.getOwnerAndRepoObj(),
        pull_number: issueNumber
    });
    return result.data.comments + result.data.review_comments;
}