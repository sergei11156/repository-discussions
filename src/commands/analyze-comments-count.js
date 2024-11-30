'use strict'
import {chooseRepository} from "../shared/chooseRepository.js";
import inquirer from "inquirer";
import chalk from "chalk";

export const runAnalyzeCommentsCount = async () => {
    const repository = await chooseRepository();

    const { prAgeLimit } = await inquirer
        .prompt([
            {
                type: "number",
                name: "prAgeLimit",
                message: "PR age limit in years?",
                default: 100
            }
        ])
    let commitsCounts = {}
    const dateLimit = new Date();
    dateLimit.setFullYear(dateLimit.getFullYear() - prAgeLimit);

    for (const pr of repository.pullRequests) {
        if (pr.dateCreated - dateLimit >= 0) {
            if (commitsCounts.hasOwnProperty(pr.commentsCount)) {
                commitsCounts[pr.commentsCount].push(pr);
            } else {
                commitsCounts[pr.commentsCount] = [pr];
            }
        }
    }
    console.log(chalk.green("count of comments: ") + chalk.red("count of such PRs"))
    const countOfCommentsList
        = Object.keys(commitsCounts).map((key) => `${key}: ${chalk.red(commitsCounts[key].length)}`)
    const countOfColumns = 6;
    const slices = countOfCommentsList.length / countOfColumns;
    for (let i = 0; i < countOfColumns; i++) {
        let str = '';
        for (let j = 0; j < slices; j++) {
            const curStr = countOfCommentsList[j*countOfColumns + i];
            if (curStr) {
                let spaces = 20 - curStr.length;
                str += curStr + (new Array(spaces >= 0 ? spaces : 0)).join(' ');
            }
        }
        console.log(chalk.green(str))
    }


    const { minCount } = await inquirer
        .prompt([
            {
                type: "number",
                name: "minCount",
                message: "Minimum count of comments in PR:",
                default: 0
            }
        ])

    const prsCommentsCountToShow = Object.keys(commitsCounts).filter((value) => value >= minCount);
    for (const commentsCount of prsCommentsCountToShow) {
        const pullRequests = commitsCounts[commentsCount];
        for (const pullRequest of pullRequests) {
            console.log(chalk.red((new Array(80).join('-'))))
            console.log(chalk.red(`${pullRequest.title} ${chalk.yellow(`#${pullRequest.number}`)}`))
            console.log(chalk.green(`${pullRequest.html_url}`))
            console.log(chalk.green(`Created At: ${pullRequest.created_at}`))
            console.log(chalk.green(`Updated At: ${pullRequest.updated_at}`))
            console.log(chalk.green(`Closed At: ${chalk.yellow(pullRequest.closed_at)}`))
            console.log(chalk.green(`Merged At: ${chalk.yellow(pullRequest.merged_at)}`))
            console.log(chalk.green(`Comments count: ${chalk.yellow(pullRequest.commentsCount)}`))
        }
    }
};