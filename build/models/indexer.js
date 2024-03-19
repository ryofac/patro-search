var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { load } from 'cheerio';
import { PageManager } from '../manager/pageManager.js';
import { RequestNotCompletedError } from '../err/requestNotCompletedError.js';
import { FileUtils } from '../utils/fileUtils.js';
import got from "got";
import { Page } from './page.js';
/** Classe encarreagada de indexar os dados das páginas a fim de pontuá-las depois com o buscador */
export class Indexer {
    constructor() {
        /** Meio de persistência das paginas */
        this.pageManager = new PageManager();
    }
    /** Aplica a indexação das páginas */
    index(siteUrl) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Pegando a resposta da requisição do site
            const response = yield got(siteUrl).catch((err) => {
                throw new RequestNotCompletedError("Requisição não OK");
            });
            // Dados da requisição
            const headers = response.headers;
            const body = response.body;
            // Verificando se é um html mesmo ( não um json de alguma api )
            if (!((_a = headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes("html"))) {
                throw new Error("Arquivo não é um html");
            }
            // Carregando a página com o cheerio, que funciona semelhante ao beautiful soap
            const $ = load(body);
            /** Título da Página */
            const pageTitle = $('title').text() || $('h1').text();
            // Aqui eu já tenho todas as tags "anchor"
            const linksA = $('a');
            const anchorsArray = linksA.toArray();
            /** Guarda os links da página. */
            const avaliableLinks = new Array();
            // Povoando os links disponiveis com os encontrados nas tags <a>
            anchorsArray.forEach(tagA => {
                const actualLink = String($(tagA).attr("href"));
                avaliableLinks.push(actualLink);
            });
            // Pegando a data de criação:
            const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;
            const dataStr = (_b = $("p").text().match(dateRegex)) === null || _b === void 0 ? void 0 : _b[0];
            let date;
            if (dataStr) {
                const [day, month, year] = dataStr.split('/').map(Number);
                date = new Date(year, month, day);
            }
            else {
                date = undefined;
            }
            // Salvando essa página indexada na persistência de páginas criadas:
            this.pageManager.createPage(new Page(pageTitle, siteUrl, avaliableLinks, body, date));
            console.log("Página " + pageTitle + " salva!");
            FileUtils.savePageFile(pageTitle, body);
            // Passeando por todos os links presentes na página
            for (const link of avaliableLinks) {
                if (this.pageManager.isPageIndexed(link)) {
                    continue;
                }
                yield this.index(link);
            }
        });
    }
    /** Exibe todas as páginas indexadas */
    printAllPages() {
        this.pageManager.printAllPages();
    }
}
