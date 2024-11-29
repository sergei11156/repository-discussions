import {saveToFile} from "./json.js";

export class ChunkLoader {

    _loadFunction
    _name
    get name() {
        return this._name;
    }
    _nextPage = 1
    _started_at
    _ended_at
    _all_pages_data = []

    constructor(name, loadFunction) {
        this._name = name;
        this._loadFunction = loadFunction
        this._started_at = Date.now();
    }

    async loadUntilEnd() {
        this._started_at = Date.now();
        this._all_pages_data = [];
        let emptyReturned = false;
        do {
            const result = await this._loadFunction(this._nextPage);
            this._all_pages_data = [...this._all_pages_data, ...result.data];
            this._nextPage = this._nextPage + 1;
            emptyReturned = result.data.length === 0;
        } while (!emptyReturned);
        this._ended_at = Date.now();
        return this._all_pages_data;
    }
}