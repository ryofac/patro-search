export class PageManager {
    constructor() {
        // Um "gerenciador de páginas indexadas", uma mistura de um pageRepository e um pageService, semelhante a rede social criada em outra atividade"
        this._indexedPages = new Array();
    }
    get indexedPages() {
        return this._indexedPages;
    }
    createPage(newPage) {
        if (this.isPageIndexed(newPage.indexUrl)) {
            console.log("PÁGINA " + newPage.title + "Já indexada, skipando");
            return;
        }
        this.indexedPages.push(newPage);
    }
    isPageIndexed(linkToBeVerified) {
        for (let page of this.indexedPages) {
            if (page.indexUrl.includes(linkToBeVerified)) {
                return true;
            }
        }
        return false;
    }
    printAllPages() {
        console.log("PÁGINAS INDEXADAS: " + this.indexedPages.length);
        console.log(JSON.stringify(this.indexedPages, null, 2));
    }
}
