'use strict'
import inquirer from "inquirer";
import chalk from "chalk";
import {Repository} from "../models/repository.js";
import {compareWithAgeLimit} from "../shared/compareWithAgeLimit.js";

export const runAnalyzePullRequestCommentsCount = async () => {
    let { repository } = await inquirer
        .prompt([
            {
                type: "list",
                name: "repository",
                message: "Choose repository:",
                choices: await Repository.getAvailableRepoSlugs(),
            }
        ])
    repository = await Repository.loadBySlug(repository);

    let commitsCounts = {}
    for (const pr of repository.pullRequests) {
        if (compareWithAgeLimit(new Date(pr.createdAt))) {
            const totalCommentsAndReviews = pr.reviews.totalCount + pr.comments.totalCount
            if (commitsCounts.hasOwnProperty(totalCommentsAndReviews)) {
                commitsCounts[totalCommentsAndReviews].push(pr);
            } else {
                commitsCounts[totalCommentsAndReviews] = [pr];
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
        for (const pr of commitsCounts[commentsCount]) {
            console.log(chalk.red((new Array(80).join('-'))))
            console.log(chalk.red(`${pr.title} ${chalk.yellow(`#${pr.number}`)}`))
            console.log(chalk.green(`${pr.url}`))
            console.log(chalk.green(`State: ${chalk.yellow(pr.state)}`))
            console.log(chalk.green(`Created At: ${chalk.yellow(pr.createdAt)}`))
            console.log(chalk.green(`Comments count: ${chalk.yellow(commentsCount)}`))
        }
    }

    return true;
};