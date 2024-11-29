


export class Issue {
    _number
    _created_at
    _updated_at
    _closed_at
    _merged_at
    _html_url
    constructor(data) {
        this._number = data.number;
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
        this._closed_at = data.closed_at;
        this._merged_at = data.merged_at;
        this._html_url = data.html_url;
    }


    getData() {
        return {
            number: this._number,
            created_at: this._created_at,
            updated_at: this._updated_at,
            closed_at: this._closed_at,
            merged_at: this._merged_at,
            html_url: this._html_url
        };
    }
}