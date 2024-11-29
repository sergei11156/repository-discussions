import ora from "ora";
import {getOctokit} from "../shared/githubClient.js";


export const loadRepositoryDescription = async (repository) => {
    const octokit = getOctokit();

    const { data: repoData } = await octokit.rest.repos.get(repository.getOwnerAndRepoObj())
    repository.description = repoData.description;
    return await repository.save()
}

export const loadPullRequests = async (repository) => {
    const pulls = await getOctokit().rest.pulls.list({
        ...repository.getOwnerAndRepoObj(),
        state: "all",
        per_page: 100,
        page: 1,
    });
    console.log(pulls);
}

export const loadPullRequestCommentsCount = async (repository) => {
    const spinner = ora('Loading repository pull requests').start()
    console.log(pulls.data.length);
    for (const pull of pulls.data) {
        const result = await octokit.rest.pulls.get({owner, repo, pull_number: pull.number})
        console.log(result.data.comments);
        break;
    }
}