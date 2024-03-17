import { Indexer } from "../models/indexer.js";

async function main() {
    const indexador: Indexer = new Indexer();
    const siteToIndex: string = "https://meidesu.github.io/movies-pages/interestelar.html";

    await indexador.index(siteToIndex);
    indexador.printAllPages();
}

main();