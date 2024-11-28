#!/usr/bin/env node

import inquirer from "inquirer";
import { runBasicExample } from "../src/commands/basic-example.js";
import { runChalkExample } from "../src/commands/chalk-example.js";
import { runInquirerConfirmExample } from "../src/commands/inquirer-confirm-example.js";
import { runInquirerListExample } from "../src/commands/inquirer-list-example.js";
import { runOraExample } from "../src/commands/ora-example.js";
import chalk from "chalk";
import figlet from "figlet";
import {runAnalyzeRepository} from "../src/commands/analyze-repository.js";

console.log(
    chalk.green(figlet.textSync("Repo-Discussions", { horizontalLayout: "full", width: 120 }))
);

const examples = {
  "Analyze Repository": runAnalyzeRepository,
  "Basic Example": runBasicExample,
  "Chalk Example": runChalkExample,
  "Inquirer Confirm Example": runInquirerConfirmExample,
  "Inquirer List Example": runInquirerListExample,
  "Ora Example": runOraExample,
};

inquirer
  .prompt([
    {
      type: "list",
      name: "selectedExample",
      message: "Choose an example to run:",
      choices: Object.keys(examples),
    },
  ])
  .then((answers) => {
    const exampleFunction = examples[answers.selectedExample];
    if (exampleFunction) {
      exampleFunction();
    } else {
      console.error("Invalid selection");
    }
  });
