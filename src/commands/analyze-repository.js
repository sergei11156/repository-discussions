import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

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
            const spinner = ora('Loading repository description').start()
            octokit.rest.repos.get({owner, repo}).then((repo) => {
                spinner.succeed(chalk.green(`Repository: ${repo.data.name} \n Description: ${repo.data.description}`));
            })
        });
};
