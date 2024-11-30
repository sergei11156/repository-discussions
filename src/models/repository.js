import {listFiles, loadFromFile, saveToFile} from "../storage/json.js";


export class Repository {
    _pullRequests = [];
    set pullRequests(value) {
        this._pullRequests = value;
    }

    _owner;
    get owner() {
        return this._owner;
    }

    _name;
    get name() {
        return this._name;
    }

    _description;
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
        return await saveToFile(this.fileName, {
            owner, name,
            description: this._description,
            pullRequests: this._pullRequests
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
        const content = await loadFromFile(this.fileName)
        this._owner = content.owner;
        this._name = content.name;
        this._description = content.description;
        this._pullRequests = content.pullRequests;
    }

    get fileName() {
        return `${this._owner}_${this._name}`;
    }

    get pullRequests() {
        return this._pullRequests;
    }
}