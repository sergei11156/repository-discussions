import {Repository} from "../models/repository.js";
import inquirer from "inquirer";

export const chooseRepository = async () => {
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