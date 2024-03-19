import { View } from "./view.js";
import chalk from "chalk";
export class ResultView extends View {
    constructor(viewHandler, searcher) {
        super(viewHandler);
        this.searcher = searcher;
    }
    showPage(rankNum, page) {
        this.showLines();
        this.showText(`${rankNum} - ${page.title}`);
        const evaluation = page.evaluation;
        // Printando as propriedades
        for (const prop in evaluation) {
            if (evaluation.hasOwnProperty(prop)) {
                this.showText(`${this.modifyText(prop, { color: chalk.yellow })}: ${evaluation[prop]}`);
            }
        }
        this.showText("Pontos totais: " + page.evaluation.getTotalPoints(), { centered: true, color: page.evaluation.getTotalPoints() > 20 ? chalk.green : chalk.red });
        this.showLines();
    }
    execute() {
        this.clearTerminal();
        this.showText("TERMO PESQUISADO: " + this.searcher.searchTerm.toUpperCase(), { centered: true, backgroundColor: chalk.bgYellow });
        const results = this.searcher.rank();
        results.forEach((page, index) => {
            this.showPage(index++, page);
        });
        this.enterToContinue();
        this.viewHandler.goBackView();
    }
}
