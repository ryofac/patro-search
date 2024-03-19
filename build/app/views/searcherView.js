import { invalidSearchTermError } from "../../err/invalidSearchTermError.js";
import { ResultView } from "./resultView.js";
import { View } from "./view.js";
import chalk from "chalk";
export class SearcherView extends View {
    constructor(viewHandler, searcher) {
        super(viewHandler);
        this.EXIT = 0;
        this.searcher = searcher;
    }
    execute() {
        this.showLines();
        this.showText("PATRO SEARCH: ", { centered: true, color: chalk.blueBright });
        this.showLines();
        this.showText("Digite o termo da sua busca: ", { centered: true });
        this.showText("(0 para sair)", { centered: true, color: chalk.white });
        try {
            const searchTerm = this.getInput();
            if (Number(searchTerm) === this.EXIT) {
                this.viewHandler.goBackView();
                return;
            }
            this.searcher.search(searchTerm);
            this.viewHandler.goToView(new ResultView(this.viewHandler, this.searcher));
        }
        catch (error) {
            if (error instanceof invalidSearchTermError) {
                this.showText("TERMO DE BUSCA INVÁLIDO!", { color: chalk.redBright, centered: true });
                this.enterToContinue();
            }
        }
    }
}
