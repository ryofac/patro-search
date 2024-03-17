import { Page } from "../models/page.js";

export class PageManager {
    // Um "gerenciador de páginas indexadas", uma mistura de um pageRepository e um pageService, semelhante a rede social criada em outra atividade"

    private indexedPages: Array<Page> = new Array<Page>();

    createPage(newPage: Page) : void {
        this.indexedPages.push(newPage);
    }

    isPageIndexed(linkToBeVerified: string) : boolean {
        console.log("VERIFICANDO: " + linkToBeVerified)
        for(let page of this.indexedPages){
            if(page.indexUrl == linkToBeVerified){
                return true
            }
        }
        return false;
    }
}