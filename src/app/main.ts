import { Indexer } from "../models/indexer.js";
import { Searcher } from "../models/searcher.js";

async function main() {
    const indexador: Indexer = new Indexer();
    const buscador: Searcher = new Searcher(indexador);
    const siteToIndex: string = "https://meidesu.github.io/movies-pages/interestelar.html";

    await buscador.initializeSearcher();

    buscador.search("matrix");


}

main();