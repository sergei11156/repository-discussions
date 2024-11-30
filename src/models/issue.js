export class Issue {
    get number() {
        return this._number;
    }

    _number
    _created_at
    _updated_at
    _closed_at
    _merged_at
    _html_url
    _title
    _commentsCount

    constructor(data) {
        this._number = data.number;
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
        this._closed_at = data.closed_at;
        this._merged_at = data.merged_at;
        this._html_url = data.html_url;
        this._title = data.title;
        if (data.hasOwnProperty("commentsCount")) {
            this._commentsCount = data.commentsCount;
        }
    }


    getData() {
        return {
            number: this._number,
            title: this._title,
            created_at: this._created_at,
            updated_at: this._updated_at,
            closed_at: this._closed_at,
            merged_at: this._merged_at,
            html_url: this._html_url,
            commentsCount: this._commentsCount,
        };
    }

    setCommentsCount(count) {
        this._commentsCount = count;
    }

    get commentsCount() {
        return this._commentsCount;
    }

    get created_at() {
        return this._created_at;
    }

    get title() {
        return this._title;
    }
}