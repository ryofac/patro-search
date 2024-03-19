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
import { Evaluation } from "./evaluation.js";
import { invalidSearchTermError } from "../err/invalidSearchTermError.js";
import chalk from "chalk";
// Classe encarregada de buscar e atribuir as pontuações das páginas de acordo com um termo de busca
export class Searcher {
    constructor(indexer) {
        this._searchTerm = "";
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
        }; // TODO: Consertar utils.loadConf() para fazer isso!;
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
        this.resetValues();
        this._searchTerm = this.treatSearchTerm(searchTerm);
        this.searchOcurrencies(searchTerm);
        this.calcFreshiness();
        this.calcReference();
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
                // Definindo os temos mais recorrentes: 
                const wordRegex = new RegExp(`\\b(\\w+\\W+){0,10}${searchTerm}(\\W+\\w+){0,10}\\b`, 'gi');
                let match;
                // Inicializa o array que irá armazenar os índices de cada ocorrência da palavra
                let matches = [];
                while ((match = wordRegex.exec(pageBody)) !== null) {
                    // Pega o texto da ocorrência
                    let matchText = match[0];
                    // Retirar quebras de linha e espaços em branco
                    matchText = matchText.replace(/\s+/g, ' ');
                    // Substitui a palavra desejada por ela mesma, mas com um fundo amarelo
                    let re = new RegExp(searchTerm, 'gi');
                    matchText = matchText.replace(re, chalk.bgYellow.whiteBright(searchTerm));
                    // Adiciona a ocorrência ao array de ocorrências
                    matches.push(matchText);
                }
                page.previewPhrases = matches;
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
                if (page.indexUrl == link) {
                    found.evaluation.autoReferencePenalty += this.multipliers.autoreferencePenalty;
                    return;
                }
                found.evaluation.autorityPoints += this.multipliers.autority;
            });
        });
    }
    resetValues() {
        const indexedPages = this.pageManager.indexedPages;
        indexedPages.forEach(page => {
            page.evaluation = new Evaluation();
        });
    }
    // função encarregada de rankear os resultados a fim de separar as estatísticas para cada um
    rank() {
        const toShow = this.pageManager.indexedPages
            .filter(page => page.evaluation.frequencyPoints > 0) // Filtrando as que podem ser mostradas
            .sort((a, b) => b.evaluation.getTotalPoints() - a.evaluation.getTotalPoints()); // Ordenando por maior quantidade de pontos
        return toShow;
    }
    treatSearchTerm(searchTerm) {
        if (searchTerm === "") {
            throw new invalidSearchTermError("Termo de busca vazio");
        }
        searchTerm = searchTerm.toLowerCase().trimEnd().trimStart();
        return searchTerm;
    }
    get searchTerm() {
        return this._searchTerm;
    }
}
