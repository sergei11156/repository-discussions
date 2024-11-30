import {getOctokit} from "../shared/githubClient.js";
import {ChunkLoader} from "../shared/chunkLoader.js";

export const loadPullRequests = async (repository, update) => {
    const loadFunction = async (page) => {
        const list = await getOctokit().rest.pulls.list({
            ...repository.getOwnerAndRepoObj(),
            state: "all",
            per_page: 100,
            page
        });
        return list;
    }
    const chunk_loader = new ChunkLoader('pullRequests', loadFunction);

    const allResults = await chunk_loader.loadUntilEnd(async (page, data) => {
        update(page)
        repository.initializePullRequests(data);
        await repository.save()
    });
    repository.initializePullRequests(allResults);
    return await repository.save();
}