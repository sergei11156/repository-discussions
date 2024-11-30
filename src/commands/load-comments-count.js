'use strict'
import ora from "ora";
import {chooseRepository} from "../shared/chooseRepository.js";
import {loadPullRequestCommentsCountInRepository} from "../controllers/loadPullRequestCommentsCount.js";

export const runLoadCommentsCount = async () => {
    const repository = await chooseRepository();
    const textStart = 'Loading comments count';
    const spinner = ora(textStart).start()
    await loadPullRequestCommentsCountInRepository(repository, (progress, title) => {
        spinner.text = `${textStart} ${progress}% | ${title}`;
    });

    spinner.succeed();
};