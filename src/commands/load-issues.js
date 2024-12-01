'use strict'
import ora from "ora";
import {Repository} from "../models/repository.js";
import inquirer from "inquirer";
import {loadIssues} from "../controllers/loadIssues.js";


export const runLoadIssues = async () => {
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
        const loadRepositoryPRs = `Loading ${repository.name} Issues...`;
        const spinner = ora(loadRepositoryPRs).start()
        await loadIssues(repository, (pr) => {
            spinner.text = `${loadRepositoryPRs} | ${pr} Loaded`
        });
        spinner.succeed();
    }

    return true;
};