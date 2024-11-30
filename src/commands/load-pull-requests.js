'use strict'
import {loadPullRequests} from "../controllers/loadPullRequests.js";
import ora from "ora";
import {Repository} from "../models/repository.js";
import inquirer from "inquirer";


export const runLoadPullRequests = async () => {
    const repos = await Repository.getAvailableRepoSlugs();
    let { repositories } = await inquirer
        .prompt([
            {
                type: "checkbox",
                name: "repositories",
                message: "Choose repository:",
                choices: repos,
            }
        ])

    repositories = await Promise.all(repositories.map(slug => Repository.loadBySlug(slug)));
    for (const repository of repositories) {
        const loadRepositoryPRs = `Loading ${repository.name} Pull Requests...`;
        const spinner = ora(loadRepositoryPRs).start()
        await loadPullRequests(repository, (pr) => {
            spinner.text = `${loadRepositoryPRs} | ${pr} Loaded`
        });
        spinner.succeed();
    }
};