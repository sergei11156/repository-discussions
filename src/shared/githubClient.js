import {Octokit} from "octokit";


let octokit = null;


const initialize = async (token) => {
    octokit = new Octokit({auth: token});
}

const getOctokit = () => {
    if (!octokit) {
        throw new Error('You should call authorize first');
    }
    return octokit;
}


export {initialize, getOctokit};