var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { load } from "cheerio";
// Classe encarregada de buscar e atribuir as pontuações das páginas de acordo com um termo de busca
export class Searcher {
    constructor(indexer) {
        // Multiplicadores que podem ser alterados nos critérios de rankeamento
        this.multipliers = {
            autority: 20,
            occurrency: 5,
            meta: 20,
            h1: 15,
            h2: 10,
            p: 5,
            a: 2,
            freshContent: 30,
            freshContentPenalty: 5,
            autoreferencePenalty: 20
        };
        // O ponto de start padrão do indexador
        this.defaultStartPoint = "https://meidesu.github.io/movies-pages/matrix.html";
        // Colocando valores padrão:
        this.indexer = indexer;
        this.pageManager = indexer.pageManager;
    }
    // Inicializando o buscador => atribuindo o indexador e setando o ponto de início 
    // para ele indexar as páginas
    initializeSearcher(startPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.indexer.index(startPoint || this.defaultStartPoint);
        });
    }
    // Pesquisa geral
    search(searchTerm) {
        this.searchOcurrencies(searchTerm);
        this.calcFreshiness();
        this.calcReference();
        this.showResults();
    }
    // Contando as ocorrências que de um certo termo dentro das tags das páginas e atribuindo a pontuação nas páginas
    searchOcurrencies(searchTerm) {
        // Pegando a página dentro das páginas indexadas!
        const indexedPages = this.pageManager.indexedPages;
        // Iterando para cada página
        indexedPages.forEach(page => {
            const cheer = load(page.content);
            const pageHead = cheer("head").text();
            const pageBody = cheer("body").text();
            // Pontos de ocorrência
            let occPoints = 0;
            // Pontos de tag
            let tagPoints = 0;
            // Expressão regular para buscar ocorrências de um determinado padrão em uma página
            const regex = new RegExp(searchTerm, "gi"); // 'g' para corresponder globalmente e 'i' para ignorar maiúsculas e minúsculas
            // Elencando os elementos do Body
            if (pageBody) {
                cheer("h1").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length;
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.h1;
                });
                cheer("h2").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length;
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.h2;
                });
                cheer("p").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length;
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.p;
                });
                cheer("a").each((index, element) => {
                    const h1Text = cheer(element).text();
                    occPoints += (h1Text.match(regex) || []).length;
                    tagPoints += (h1Text.match(regex) || []).length * this.multipliers.a;
                });
            }
            // Elecando os elementos de head (meta tags, title)
            if (pageHead) {
                // Contando ponto para as meta-tags
                occPoints += (pageHead.match(regex) || []).length;
                tagPoints += (pageHead.match(regex) || []).length * this.multipliers.meta;
            }
            // Os pontos de frequência ( ocorrência tem um multiplicador também, para cada um)
            occPoints = occPoints * this.multipliers.occurrency;
            // adcionando os dados na página:
            page.evaluation.tagsPoints = tagPoints;
            page.evaluation.frequencyPoints = occPoints;
        });
    }
    // Atribuindo a pontuação baseada no quão a página é fresca
    calcFreshiness() {
        const indexedPages = this.pageManager.indexedPages;
        // Iteando para todas as páginas 
        indexedPages.forEach(page => {
            const actualYear = (new Date()).getFullYear();
            const pageDate = page.date;
            if (!pageDate) {
                console.error("Alerta: pagina " + page.title + "não possui uma data válida");
                return;
            }
            const pageYear = pageDate.getFullYear();
            const diff = Math.floor(actualYear - pageYear); // diferença em anos, garantido que será inteiro
            // Vai ser atribuido tantos pontos pelo conteúdo publicado no ano - pontos de penalidade a cada ano anterior
            page.evaluation.freshPoints = this.multipliers.freshContent - (this.multipliers.freshContentPenalty * diff);
        });
    }
    calcReference() {
        const indexedPages = this.pageManager.indexedPages;
        indexedPages.forEach(page => {
            page.links.forEach(link => {
                const found = this.pageManager.findPageByURL(link);
                if (!found)
                    return;
                found.evaluation.autorityPoints += this.multipliers.autority;
                if (page.indexUrl == link) {
                    found.evaluation.autoReferencePenalty += this.multipliers.autoreferencePenalty;
                }
            });
        });
    }
    // Função de teste pra mostrar os resultados
    showResults() {
        const indexedPages = this.pageManager.indexedPages;
        console.log("\n >>> RESULTADOS: ");
        indexedPages.forEach(page => {
            console.log("PÁGINA: " + page.title);
            console.log("DATA: " + page.date);
            console.log("TOTAL DE PONTOS: " + page.evaluation.getTotalPoints());
            console.log("EVALUATION:");
            console.log(JSON.stringify(page.evaluation, null, 2));
        });
    }
    // função encarregada de rankear os resultados a fim de separar as estatísticas para cada um
    rank() {
    }
}
