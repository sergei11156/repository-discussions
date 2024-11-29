import {saveToFile} from "../storage/json.js";


export class Repository {
    _owner;
    _name;
    _description;

    constructor(slug) {
        const [owner, name] = slug.split('/');
        this._owner = owner;
        this._name = name;
    }

    async save () {
        const owner = this._owner;
        const name = this._name;
        return await saveToFile(`${owner}_${name}`, {
            owner, name,
            description: this._description,
        })
    };

    getOwnerAndRepoObj() {
        return {
            owner: this._owner,
            repo: this._owner,
        }
    }
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}