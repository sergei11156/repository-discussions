import inquirer from "inquirer";
import {Repository} from "../models/repository.js";
import {loadRepositoryDescription} from "../controllers/getRepositoryData.js";


export const runAddRepository = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "slug",
                message: "Enter owner/repo:",
            },
        ])
        .then((answers) => {
            const repository = new Repository(answers.slug);

            loadRepositoryDescription(repository);
        });
};

