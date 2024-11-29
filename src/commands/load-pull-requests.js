'use strict'
import inquirer from "inquirer";
import {Repository} from "../models/repository.js";
import {loadPullRequests, loadRepositoryDescription} from "../controllers/getRepositoryData.js";
import chalk from "chalk";
import ora from "ora";

const chooseRepository = async () => {
    const repos = await Repository.loadAll();
    const answer = await inquirer
        .prompt([
            {
                type: "list",
                name: "repository",
                message: "Choose repository:",
                choices: repos.map((repo) => repo.slug),
            }
        ])
    return repos.find((repo) => repo.slug === answer.repository);
}
export const runLoadPullRequests = async () => {
    const repository = await chooseRepository();
    const spinner = ora('Loading repository pull requests').start()
    await loadPullRequests(repository);
    spinner.succeed();
};