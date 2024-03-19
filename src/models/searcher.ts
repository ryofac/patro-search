import { load } from "cheerio";
import { PageManager } from "../manager/pageManager.js";
import { Indexer } from "./indexer.js";
import { MultipliyerOptions } from "./multipliyerOptions.js";
import { Page } from "./page.js";
import { Evaluation } from "./evaluation.js";
import { invalidSearchTermError } from "../err/invalidSearchTermError.js";
// Classe encarregada de buscar e atribuir as pontuações das páginas de acordo com um termo de busca
export class Searcher {
    // O indexador utilizado
    indexer: Indexer;
    private _searchTerm: string = "";

    // Multiplicadores que podem ser alterados nos critérios de rankeamento
    multipliers: MultipliyerOptions = {
        autority : 20,
        occurrency : 5,
        meta : 20,
        h1 : 15,
        h2 : 10,
        p : 5,
        a : 2,
        freshContent : 30,
        freshContentPenalty : 5, 
        autoreferencePenalty : 20
    } // TODO: Consertar utils.loadConf() para fazer isso!;
    

    // O gerenciador de páginas: quem controla as páginas indexadas
    pageManager: PageManager;

    // O ponto de start padrão do indexador
    defaultStartPoint: string = "https://meidesu.github.io/movies-pages/matrix.html";

    constructor(indexer: Indexer) {

        // Colocando valores padrão:
        this.indexer = indexer;
        this.pageManager = indexer.pageManager;
    }


    // Inicializando o buscador => atribuindo o indexador e setando o ponto de início 
    // para ele indexar as páginas
    async initializeSearcher(startPoint?: string){
       await this.indexer.index(startPoint || this.defaultStartPoint)

    }

    // Pesquisa geral
    search(searchTerm: string){
        this.resetValues();
        this._searchTerm = this.treatSearchTerm(searchTerm);
        this.searchOcurrencies(searchTerm);
        this.calcFreshiness();
        this.calcReference();
    }

    // Contando as ocorrências que de um certo termo dentro das tags das páginas e atribuindo a pontuação nas páginas
    searchOcurrencies(searchTerm: string): void{
        // Pegando a página dentro das páginas indexadas!
        const indexedPages = this.pageManager.indexedPages;

        // Iterando para cada página
        indexedPages.forEach( page => {
            const cheer = load(page.content);

            const pageHead = cheer("head").text();
            const pageBody = cheer("body").text();

            // Pontos de ocorrência
            let occPoints = 0;

            // Pontos de tag
            let tagPoints = 0;

            // Expressão regular para buscar ocorrências de um determinado padrão em uma página
            const regex = new RegExp(searchTerm, "gi");  // 'g' para corresponder globalmente e 'i' para ignorar maiúsculas e minúsculas

            // Elencando os elementos do Body
            if (pageBody) {
                cheer("h1").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.h1;
                })

                cheer("h2").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.h2;
                })

                cheer("p").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.p;
                })

                cheer("a").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.a;
                })

            }

            // Elecando os elementos de head (meta tags, title)
            if(pageHead){
                // Contando ponto para as meta-tags
                occPoints += (pageHead.match(regex) || []).length
                tagPoints += (pageHead.match(regex) || []).length * this.multipliers.meta;
            }

            // Os pontos de frequência ( ocorrência tem um multiplicador também, para cada um)
            occPoints = occPoints * this.multipliers.occurrency;

            // adcionando os dados na página:
            page.evaluation.tagsPoints = tagPoints;
            page.evaluation.frequencyPoints = occPoints;
        })
    }
    
    // Atribuindo a pontuação baseada no quão a página é fresca
    calcFreshiness(){
        const indexedPages = this.pageManager.indexedPages;

        // Iteando para todas as páginas 
        indexedPages.forEach(page => {
            const actualYear = (new Date()).getFullYear();
            const pageDate = page.date;

            if(!pageDate){
                console.error("Alerta: pagina " + page.title + "não possui uma data válida");
                return; 
            }

            const pageYear = pageDate.getFullYear();
            const diff = Math.floor(actualYear - pageYear); // diferença em anos, garantido que será inteiro


            // Vai ser atribuido tantos pontos pelo conteúdo publicado no ano - pontos de penalidade a cada ano anterior
            page.evaluation.freshPoints = this.multipliers.freshContent - (this.multipliers.freshContentPenalty * diff)

        })

    }

    calcReference(){
        const indexedPages = this.pageManager.indexedPages;

        indexedPages.forEach(page => {
            page.links.forEach(link => {
                const found = this.pageManager.findPageByURL(link);
                if(!found) return;

                if(page.indexUrl == link){
                    found.evaluation.autoReferencePenalty += this.multipliers.autoreferencePenalty
                    return;
                }

                found.evaluation.autorityPoints += this.multipliers.autority;
            })

        })
    }

    resetValues(){
        const indexedPages = this.pageManager.indexedPages;
        indexedPages.forEach(page => {
            page.evaluation = new Evaluation();
        })

    }




    // função encarregada de rankear os resultados a fim de separar as estatísticas para cada um
    rank() : Array<Page> {
        const toShow = this.pageManager.indexedPages
        .filter(page => page.evaluation.frequencyPoints > 0) // Filtrando as que podem ser mostradas
        .sort((a, b) => b.evaluation.getTotalPoints() - a.evaluation.getTotalPoints()); // Ordenando por maior quantidade de pontos

        return toShow;
        
    }

    treatSearchTerm(searchTerm: string) {
        if(searchTerm === ""){
            throw new invalidSearchTermError("Termo de busca vazio");
        }
        searchTerm = searchTerm.toLowerCase().trimEnd().trimStart();
        return searchTerm;

    }

    get searchTerm() {
        return this._searchTerm;
    }


    
}