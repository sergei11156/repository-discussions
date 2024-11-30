import inquirer from "inquirer";
import {Repository} from "../models/repository.js";
import {loadRepositoryDescription} from "../controllers/loadRepositoryDescription.js";
import chalk from "chalk";
import ora from "ora";

export const runAddRepository = async () => {
    const answers = await inquirer
        .prompt([
            {
                type: "input",
                name: "slug",
                message: "Enter owner/repo:",
            },
        ])
    const repository = new Repository(answers.slug);
    const spinner = ora('Loading repository description').start()
    const message = await loadRepositoryDescription(repository)
    console.log(chalk.green(`Description: ${repository.description}`));
    spinner.succeed(chalk.green(message));
    return true;
};

