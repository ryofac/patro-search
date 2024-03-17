import { Evaluation } from "./evaluation.js";

export class Page {
    private _title: string
    private _indexUrl: string
    private _links : Array<string>;
    private _points: number = 0;
    private _evaluation: Evaluation;
    private _content: string;
    

    constructor(title: string, indexUrl: string, links: Array<string>, content: string){
        this._title = title;
        this._indexUrl = indexUrl;
        this._links = links;
        this._evaluation = new Evaluation();
        this._content = content;
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


    get points(): string{
        return this._title;
    }
    
    set points(newPoints: number){
        this.points = newPoints;
    }

    


    


}