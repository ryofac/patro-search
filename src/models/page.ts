import { Evaluation } from "./evaluation.js";

export class Page {
    private _title: string
    private _indexUrl: string
    private _date: Date | undefined;
    private _links : Array<string>;
    private _evaluation: Evaluation;
    private _content: string;
    private _previewPhrases: Array<string> = [];
    

    constructor(title: string, indexUrl: string, links: Array<string>, content: string, date: Date | undefined){
        this._title = title;
        this._indexUrl = indexUrl;
        this._links = links;
        this._evaluation = new Evaluation();
        this._content = content;
        this._date = date;
    }

    get indexUrl(): string{
        return this._indexUrl;
    }

    get content(): string{
        return this._content;
    }

    set indexUrl(newValue){
        this.indexUrl = newValue;
    }

    get title(): string{
        return this._title;
    }
    
    set title(newTitle: string){
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

    set previewPhrases(newPhrases: Array<string>) {
        this._previewPhrases = newPhrases;
    }

    get previewPhrases() {
        return this._previewPhrases;
    }
    

    


    


}