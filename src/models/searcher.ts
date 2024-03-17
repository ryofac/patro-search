import { load } from "cheerio";
import { PageManager } from "../manager/pageManager.js";
import { Indexer } from "./indexer.js";
// Classe encarregada de buscar e atribuir as pontuações das páginas de acordo com um termo de busca
export class Searcher {
    // O indexador utilizado
    indexer: Indexer;

    // O gerenciador de páginas: quem controla as páginas indexadas
    pageManager: PageManager;

    // O ponto de start padrão do indexador
    defaultStartPoint: string = "https://meidesu.github.io/movies-pages/matrix.html";

    constructor(indexer: Indexer) {
        this.indexer = indexer;
        this.pageManager = indexer.pageManager;

    }


    // Inicializando o buscador => atribuindo o indexador e setando o ponto de início 
    // para ele indexar as páginas
    initializeSearcher(startPoint?: string){
        this.indexer.index(startPoint || this.defaultStartPoint)

    }


    // Pesquisa geral
    search(searchTerm: string){
        
    }

    // Contando as ocorrências que de um certo termo dentro das tags das páginas
    searchOcurrencies(searchTerm: string): void{
        // Pegando a página dentro das páginas indexadas!
        const indexedPages = this.pageManager.indexedPages;

        // Iterando para cada página
        indexedPages.forEach( page => {
            const cheer = load(page.content);
            // Expressão regular para buscar ocorrências de um determinado padrão em uma página
            const regex = new RegExp(searchTerm, "gi");  // 'g' para corresponder globalmente e 'i' para ignorar maiúsculas e minúsculas
            const occurrences = cheer("body").text().match(regex);

            // TODO: continuar a implementação seguindo a atividade
        })


    }
    
}