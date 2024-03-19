import { View } from "./view.js";
import chalk from "chalk";
export class ResultView extends View {
    constructor(viewHandler, searcher) {
        super(viewHandler);
        this.searcher = searcher;
    }
    showPage(rankNum, page) {
        this.showLines();
        this.showText(`${rankNum} - ${page.title}`, { centered: true, color: chalk.yellowBright });
        const evaluation = page.evaluation;
        this.showText("Pontos totais: " + page.evaluation.getTotalPoints(), { centered: true, color: page.evaluation.getTotalPoints() > 20 ? chalk.green : chalk.red });
        // Printando as propriedades de pontuação
        for (const prop in evaluation) {
            if (evaluation.hasOwnProperty(prop)) {
                this.showText(`${this.modifyText(prop, { color: chalk.yellow })}: ${evaluation[prop]}`);
            }
        }
        console.log();
        // preview das palavras encontradas:
        page.previewPhrases.forEach(phrase => {
            console.log("..." + phrase + "...");
        });
        this.showLines();
    }
    execute() {
        this.clearTerminal();
        this.showText("TERMO PESQUISADO: " + this.searcher.searchTerm.toUpperCase(), { centered: true, backgroundColor: chalk.bgYellow });
        const results = this.searcher.rank();
        results.forEach((page, index) => {
            this.showPage(index + 1, page);
        });
        this.enterToContinue();
        this.viewHandler.goBackView();
    }
}
