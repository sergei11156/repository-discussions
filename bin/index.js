#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import {runAddRepository} from "../src/commands/add-repository.js";
import dotenv from "dotenv";
import {initialize} from "../src/shared/githubClient.js";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable requires');
}
initialize(GITHUB_TOKEN);

console.log(
    chalk.green(figlet.textSync("Repo-Discussions", { horizontalLayout: "full", width: 120 }))
);

const options = {
  "Add Repository": runAddRepository,
};

inquirer
  .prompt([
    {
      type: "list",
      name: "selectedCommand",
      message: "Choose a command to run:",
      choices: Object.keys(options),
    },
  ])
  .then((answers) => {
    const exampleFunction = options[answers.selectedCommand];
    if (exampleFunction) {
      exampleFunction();
    } else {
      console.error("Invalid selection");
    }
  });
