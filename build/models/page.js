import { Evaluation } from "./evaluation.js";
export class Page {
    constructor(title, indexUrl, links, content, date) {
        this._title = title;
        this._indexUrl = indexUrl;
        this._links = links;
        this._evaluation = new Evaluation();
        this._content = content;
        this._date = date;
    }
    get indexUrl() {
        return this._indexUrl;
    }
    get content() {
        return this._content;
    }
    set indexUrl(newValue) {
        this.indexUrl = newValue;
    }
    get title() {
        return this._title;
    }
    set title(newTitle) {
        this.title = newTitle;
    }
    get evaluation() {
        return this._evaluation;
    }
    set evaluation(newEval) {
        this._evaluation = newEval;
    }
    get date() {
        return this._date;
    }
    get links() {
        return this._links;
    }
}
