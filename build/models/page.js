import { Evaluation } from "./evaluation.js";
export class Page {
    constructor(title, indexUrl, links, content) {
        this._points = 0;
        this._title = title;
        this._indexUrl = indexUrl;
        this._links = links;
        this._evaluation = new Evaluation();
        this._content = content;
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
    get points() {
        return this._title;
    }
    set points(newPoints) {
        this.points = newPoints;
    }
}
