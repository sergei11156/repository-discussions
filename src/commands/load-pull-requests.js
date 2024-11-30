'use strict'
import {loadPullRequests} from "../controllers/loadPullRequests.js";
import ora from "ora";
import {chooseRepository} from "../shared/chooseRepository.js";


export const runLoadPullRequests = async () => {
    const repository = await chooseRepository();
    const loadRepositoryPRs = 'Loading repository pull requests.';
    const spinner = ora(loadRepositoryPRs).start()
    await loadPullRequests(repository, (pr) => {
        spinner.text = `${loadRepositoryPRs} ${pr} loaded`
    });
    spinner.succeed();
};