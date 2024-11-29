'use strict'
import {loadPullRequests} from "../controllers/getRepositoryData.js";
import ora from "ora";
import {chooseRepository} from "../shared/chooseRepository.js";

export const runLoadCommentsCount = async () => {
    const repository = await chooseRepository();
    const spinner = ora('Loading load comments count').start()
    await loadPullRequests(repository);
    spinner.succeed();
};