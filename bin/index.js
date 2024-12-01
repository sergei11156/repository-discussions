#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import {runAddRepository} from "../src/commands/add-repository.js";
import {runLoadPullRequests} from "../src/commands/load-pull-requests.js";
import dotenv from "dotenv";
import {initialize} from "../src/shared/githubClient.js";
import {runAnalyzePullRequestCommentsCount} from "../src/commands/analyze-pull-request-comments-count.js";
import {runLoadIssues} from "../src/commands/load-issues.js";
import {runAnalyzeIssueCommentsCount} from "../src/commands/analyze-issue-comments-count.js";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable requires');
}
initialize(GITHUB_TOKEN);

console.log(
    chalk.green(figlet.textSync("Repo-Discussions", {horizontalLayout: "full", width: 120}))
);

const options = {
    "Add Repository": runAddRepository,
    "Load Pull Requests": runLoadPullRequests,
    "Load Issues": runLoadIssues,
    "Analyze PRs comments count": runAnalyzePullRequestCommentsCount,
    "Analyze Issue comments count": runAnalyzeIssueCommentsCount,
    "Quit": () => false
};

async function mainMenu() {
    const {selectedCommand} = await inquirer.prompt([
            {
                type: "list",
                name: "selectedCommand",
                message: "Choose a command to run:",
                choices: Object.keys(options),
            },
        ]);
    const command = options[selectedCommand];
    if (await command()) {
        await mainMenu();
    }
}
mainMenu();