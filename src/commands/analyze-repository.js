import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

const getRepositoryInfo = async (octokit, owner, repo) => {
    const spinner = ora('Loading repository description').start()
    const { data: repoData } = await octokit.rest.repos.get({owner, repo})
    spinner.succeed(chalk.green(`Repository: ${repoData.name} \n Description: ${repoData.description}`));

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

const getPullRequests = async (octokit, owner, repo) => {
    const spinner = ora('Loading repository pull requests').start()
}

export const runAnalyzeRepository = (octokit) => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "slug",
                message: "Enter owner/repo:",
            },
        ])
        .then((answers) => {
            const [owner, repo] = answers.slug.split('/');
            getRepositoryInfo(octokit, owner, repo);
        });
};

