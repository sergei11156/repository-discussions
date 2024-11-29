import ora from "ora";
import chalk from "chalk";
import {getOctokit} from "../shared/githubClient.js";


export const loadRepositoryDescription = async (repository) => {
    const spinner = ora('Loading repository description').start()
    const octokit = getOctokit();

    const { data: repoData } = await octokit.rest.repos.get(repository.getOwnerAndRepoObj())
    repository.description = repoData.description;
    const str = await repository.save()

    spinner.succeed(chalk.green(str));
}

export const loadPullRequests = async (octokit, owner, repo) => {
    // NOT READY
    const spinner = ora('Loading repository pull requests').start()

    const pulls = await octokit.rest.pulls.list({
        owner,
        repo,
        state: "all",
        per_page: 100

    });
    console.log(pulls.data.length);
    for (const pull of pulls.data) {
        const result = await octokit.rest.pulls.get({owner, repo, pull_number: pull.number})
        console.log(result.data.comments);
        break;
    }
}