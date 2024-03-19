var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { question } from "readline-sync";
import { View } from "./view.js";
import chalk from "chalk";
import { SearcherView } from "./searcherView.js";
export class MainMenuView extends View {
    constructor(viewHandler, searcher) {
        super(viewHandler);
        this.searcher = searcher;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearTerminal();
            this.showText("BUSCADOR ", { color: chalk.blueBright, centered: true });
            this.showText("1 - BUSCAR");
            this.showText("2 - Alterar critérios de rankeamento");
            this.showText("0 - Sair da aplicação");
            const mainMenuOption = Number(question("> "));
            this.selectView(mainMenuOption);
        });
    }
    selectView(optionNumber) {
        switch (optionNumber) {
            case 0:
                this.viewHandler.goBackView();
                this.showText("Fim do programa!", { color: chalk.redBright, centered: true });
                break;
            case 1:
                this.viewHandler.goToView(new SearcherView(this.viewHandler, this.searcher));
                break;
            case 2:
                // TODO: fazer uma view de alterar os parâmetros
                // this.viewHandler.goToView(new AlterParamsView(this.viewHandler, this.searcher));
                break;
        }
    }
}
