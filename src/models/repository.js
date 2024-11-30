import {listFiles, loadFromFile, saveToFile} from "../storage/json.js";
import {Issue} from "./issue.js";


export class Repository {
    _owner;
    _name;
    _description;
    _pullRequests = [];
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get slug() {
        return this._owner + '/' + this._name;
    }

    constructor(slug) {
        const [owner, name] = slug.split('/');
        this._owner = owner;
        this._name = name;
    }

    async save () {
        const owner = this._owner;
        const name = this._name;
        return await saveToFile(this.getFileName(), {
            owner, name,
            description: this._description,
            pullRequests: this.serializePullRequest()
        })
    };

    getOwnerAndRepoObj() {
        return {
            owner: this._owner,
            repo: this._name,
        }
    }

    static async loadAll() {
        const fileList = await listFiles();
        const repoSlugs = fileList.map(name => name.replace(".json", "").replace("_", "/"));
        const repositories = [];
        for (const repoSlug of repoSlugs) {
            const repo = new Repository(repoSlug)
            await repo.loadFromFile()
            repositories.push(repo);
        }
        return repositories;
    }

    async loadFromFile() {
        const content = await loadFromFile(this.getFileName())
        this._owner = content.owner;
        this._name = content.name;
        this._description = content.description;
        this.initializePullRequests(content.pullRequests);
    }

    initializePullRequests(pullRequests) {
        this._pullRequests = [];
        for (const pullRequest of pullRequests) {
            this.addPullRequest(pullRequest);
        }
    }

    addPullRequest(pullRequest) {
        this._pullRequests.push(new Issue(pullRequest));
    }

    serializePullRequest() {
        let requests = [];
        for (const pullRequest of this._pullRequests) {
            requests.push(pullRequest.getData());
        }
        return requests;
    }

    getFileName() {
        return `${this._owner}_${this._name}`;
    }

    get pullRequests() {
        return this._pullRequests;
    }
}