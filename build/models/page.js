import { Evaluation } from "./evaluation.js";
export class Page {
    constructor(title, indexUrl, links) {
        this._points = 0;
        this._title = title;
        this._indexUrl = indexUrl;
        this._links = links;
        this._evaluation = new Evaluation();
    }
    get indexUrl() {
        return this._indexUrl;
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
