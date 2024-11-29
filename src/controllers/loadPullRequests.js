import {getOctokit} from "../shared/githubClient.js";
import {ChunkLoader} from "../storage/chunkLoader.js";

export const loadPullRequests = async (repository) => {
    const loadFunction = async (page) => {
        return await getOctokit().rest.pulls.list({
            ...repository.getOwnerAndRepoObj(),
            state: "all",
            per_page: 100,
            page
        });
    }
    const chunk_loader = new ChunkLoader('pullRequests', loadFunction);

    const allResults = await chunk_loader.loadUntilEnd();
    repository.initializePullRequests(allResults);
    return await repository.save();
}