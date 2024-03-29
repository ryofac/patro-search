import { Cheerio, load, Element } from 'cheerio';
import { PageManager } from '../manager/pageManager.js';
import { RequestNotCompletedError } from '../err/requestNotCompletedError.js';
import { FileUtils } from '../utils/fileUtils.js';

import got from "got";
import { Page } from './page.js';

/** Classe encarreagada de indexar os dados das páginas a fim de pontuá-las depois com o buscador */
export class Indexer {

    /** Meio de persistência das paginas */
    pageManager: PageManager = new PageManager();

    /** Aplica a indexação das páginas */
    async index(siteUrl: string): Promise<void> {

        // Pegando a resposta da requisição do site
        const response = await got(siteUrl).catch((err: Error) => {
            throw new RequestNotCompletedError("Requisição não OK");
        })

        // Dados da requisição
        const headers = response.headers
        const body = response.body
        
        // Verificando se é um html mesmo ( não um json de alguma api )
        if(!headers['content-type']?.includes("html")){
            throw new Error("Arquivo não é um html");
        }

        // Carregando a página com o cheerio, que funciona semelhante ao beautiful soap
        const $ = load(body);

        /** Título da Página */
        const pageTitle: string = $('title').text() || $('h1').text();

        // Aqui eu já tenho todas as tags "anchor"
        const linksA: Cheerio<Element> = $('a');
        const anchorsArray = linksA.toArray();

        /** Guarda os links da página. */
        const avaliableLinks: Array<string> = new Array<string>();

        // Povoando os links disponiveis com os encontrados nas tags <a>
        anchorsArray.forEach(tagA => {
            const actualLink = String($(tagA).attr("href"));
            avaliableLinks.push(actualLink);
        })

        // Pegando a data de criação:
        const dateRegex = /(\d{2}\/\d{2}\/\d{4})/
        const dataStr = $("p").text().match(dateRegex)?.[0];

        let date: Date | undefined;
        if(dataStr){
            const [day, month, year] = dataStr.split('/').map(Number);
            date = new Date(year, month, day);
        } else {
            date = undefined;
        }

        // Salvando essa página indexada na persistência de páginas criadas:
        this.pageManager.createPage(new Page(pageTitle, siteUrl, avaliableLinks, body, date));

        console.log("Página " + pageTitle + " salva!");

        FileUtils.savePageFile(pageTitle, body);

        // Passeando por todos os links presentes na página
        for(const link of avaliableLinks){
            if(this.pageManager.isPageIndexed(link)){
                continue
            }
            await this.index(link);
        }

    }

    /** Exibe todas as páginas indexadas */
    printAllPages(): void{
        this.pageManager.printAllPages();
    }
}