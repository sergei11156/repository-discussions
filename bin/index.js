#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import {runAnalyzeRepository} from "../src/commands/analyze-repository.js";
import {Octokit} from "octokit";
import dotenv from "dotenv";
import ora from "ora";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable requires');
}

console.log(
    chalk.green(figlet.textSync("Repo-Discussions", { horizontalLayout: "full", width: 120 }))
);

const spinner = ora(`Connecting to github...`).start();
const octokit = new Octokit({auth: GITHUB_TOKEN});

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

spinner.succeed(chalk.green("Hello, " + login + "!"));

const options = {
  "Analyze Repository": runAnalyzeRepository.bind(this, octokit),
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
