"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRepository = void 0;
class pageRepository {
    constructor() {
        this.indexedPages = new Array();
    }
    createPage(newPage) {
        this.indexedPages.push(newPage);
    }
}
exports.pageRepository = pageRepository;
