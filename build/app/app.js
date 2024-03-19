var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ViewHandler } from "./views/viewHandler.js";
import { MainMenuView } from "./views/mainMenu.js";
import { Searcher } from "../models/searcher.js";
import { Indexer } from "../models/indexer.js";
class App {
    constructor() {
        this.viewHandler = new ViewHandler();
        this.indexer = new Indexer();
        this.searcher = new Searcher(this.indexer);
        this.baseView = new MainMenuView(this.viewHandler, this.searcher);
    }
    run() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searcher.initializeSearcher();
            this.viewHandler.goToView(this.baseView);
            do {
                yield ((_a = this.viewHandler.getActualView()) === null || _a === void 0 ? void 0 : _a.execute());
            } while (!this.viewHandler.isEmpty());
        });
    }
}
function main() {
    const app = new App();
    app.run();
}
main();
