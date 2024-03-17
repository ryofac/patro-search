import { load } from "cheerio";
// Classe encarregada de buscar e atribuir as pontuações das páginas de acordo com um termo de busca
export class Searcher {
    constructor(indexer) {
        // O ponto de start padrão do indexador
        this.defaultStartPoint = "https://meidesu.github.io/movies-pages/matrix.html";
        this.indexer = indexer;
        this.pageManager = indexer.pageManager;
    }
    // Inicializando o buscador => atribuindo o indexador e setando o ponto de início 
    // para ele indexar as páginas
    initializeSearcher(startPoint) {
        this.indexer.index(startPoint || this.defaultStartPoint);
    }
    // Pesquisa geral
    search(searchTerm) {
    }
    // Contando as ocorrências que de um certo termo dentro das tags das páginas
    searchOcurrencies(searchTerm) {
        // Pegando a página dentro das páginas indexadas!
        const indexedPages = this.pageManager.indexedPages;
        // Iterando para cada página
        indexedPages.forEach(page => {
            const cheer = load(page.content);
            // Expressão regular para buscar ocorrências de um determinado padrão em uma página
            const regex = new RegExp(searchTerm, "gi"); // 'g' para corresponder globalmente e 'i' para ignorar maiúsculas e minúsculas
            const occurrences = cheer("body").text().match(regex);
            // TODO: continuar a implementação seguindo a atividade
        });
    }
}
