export class PageManager {
    constructor() {
        // Um "gerenciador de páginas indexadas", uma mistura de um pageRepository e um pageService, semelhante a rede social criada em outra atividade"
        this.indexedPages = new Array();
    }
    createPage(newPage) {
        this.indexedPages.push(newPage);
    }
    isPageIndexed(linkToBeVerified) {
        console.log("VERIFICANDO: " + linkToBeVerified);
        for (let page of this.indexedPages) {
            if (page.indexUrl == linkToBeVerified) {
                return true;
            }
        }
        return false;
    }
}
