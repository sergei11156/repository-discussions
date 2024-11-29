import {getOctokit} from "../shared/githubClient.js";

export const loadRepositoryDescription = async (repository) => {
    const octokit = getOctokit();

    const { data: repoData } = await octokit.rest.repos.get(repository.getOwnerAndRepoObj())
    repository.description = repoData.description;
    return await repository.save()
}
