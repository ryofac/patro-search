import { Indexer } from "../models/indexer.js";
function main() {
    const indexador = new Indexer();
    const siteToIndex = "https://meidesu.github.io/movies-pages/interestelar.html";
    indexador.index(siteToIndex);
}
main();
