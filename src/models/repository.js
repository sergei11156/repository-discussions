import {listFiles, loadFromFile, saveToFile} from "../storage/json.js";


export class Repository {
    _pullRequests = [];
    set pullRequests(value) {
        this._pullRequests = value;
    }

    _issues = []
    get issues() {
        return this._issues;
    }
    set issues(value) {
        this._issues = value;
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
            pullRequests: this._pullRequests,
            issues: this._issues,
        })
    };

    getOwnerAndRepoObj() {
        return {
            owner: this._owner,
            repo: this._name,
        }
    }

    static async getAvailableRepoSlugs() {
        const fileList = await listFiles();
        return fileList.map(name => name.replace(".json", "").replace("_", "/"));
    }
    static async loadBySlug(slug) {
        const repo = new Repository(slug)
        await repo.loadFromFile()
        return repo;
    }

    async loadFromFile() {
        const content = await loadFromFile(this.fileName)
        this._owner = content.owner;
        this._name = content.name;
        this._description = content.description;
        this._pullRequests = content.pullRequests;
        this._issues = content.issues;
    }

    get fileName() {
        return `${this._owner}_${this._name}`;
    }

    get pullRequests() {
        return this._pullRequests;
    }
}