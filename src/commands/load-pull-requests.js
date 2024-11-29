'use strict'
import {loadPullRequests} from "../controllers/getRepositoryData.js";
import ora from "ora";
import {chooseRepository} from "../shared/chooseRepository.js";


export const runLoadPullRequests = async () => {
    const repository = await chooseRepository();
    const spinner = ora('Loading repository pull requests').start()
    await loadPullRequests(repository);
    spinner.succeed();
};