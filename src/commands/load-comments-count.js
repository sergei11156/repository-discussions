'use strict'
import ora from "ora";
import {chooseRepository} from "../shared/chooseRepository.js";
import {loadPullRequestCommentsCount} from "../controllers/loadPullRequestCommentsCount.js";

export const runLoadCommentsCount = async () => {
    const repository = await chooseRepository();
    const spinner = ora('Loading load comments count').start()
    await loadPullRequestCommentsCount(repository);
    spinner.succeed();
};