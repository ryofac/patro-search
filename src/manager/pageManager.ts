import { Page } from "../models/page.js";

export class PageManager {
    // Um "gerenciador de páginas indexadas", uma mistura de um pageRepository e um pageService, semelhante a rede social criada em outra atividade"

    private _indexedPages: Array<Page> = new Array<Page>();

    get indexedPages(){
        return this._indexedPages;
    }

    createPage(newPage: Page) : void {
        if(this.isPageIndexed(newPage.indexUrl)){
            console.log("PÁGINA " + newPage.title + "Já indexada, skipando");
            return;
        }
        this.indexedPages.push(newPage);
    }

    findPageByURL(url: string): Page | undefined {
        const pageFound = this._indexedPages.find(page => page.indexUrl === url);
        return pageFound;
    } 

    isPageIndexed(linkToBeVerified: string) : boolean {
        for(let page of this.indexedPages){
            if(page.indexUrl.includes(linkToBeVerified)){
                return true
            }
        }
        return false;
    }

    /** Exibe todas as páginas indexadas. */
    printAllPages(): void {
        console.log("PÁGINAS INDEXADAS: " + this.indexedPages.length)
        console.log(JSON.stringify(this.indexedPages, null, 2));
    }
}