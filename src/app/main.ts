import { Indexer } from "../models/indexer.js";

function main() {
    const indexador: Indexer = new Indexer();
    const siteToIndex: string = "https://meidesu.github.io/movies-pages/interestelar.html";

    indexador.index(siteToIndex);
}

main();