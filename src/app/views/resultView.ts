import { Evaluation } from "../../models/evaluation.js";
import { Page } from "../../models/page.js";
import { Searcher } from "../../models/searcher.js";
import { View } from "./view.js";
import { ViewHandler } from "./viewHandler.js";
import chalk from "chalk";

export class ResultView extends View {
    searcher: Searcher;

    constructor(viewHandler: ViewHandler, searcher: Searcher){
        super(viewHandler);
        this.searcher = searcher;
    }

    private showPage(rankNum: number, page: Page){
        this.showLines();
        this.showText(`${rankNum} - ${page.title}`)

        const evaluation = page.evaluation;
        
        // Printando as propriedades
        for (const prop in evaluation) {
            if (evaluation.hasOwnProperty(prop)) {
                this.showText(`${this.modifyText(prop, {color: chalk.yellow})}: ${evaluation[prop as keyof Evaluation]}`);
            }
        }

        this.showText("Pontos totais: " + page.evaluation.getTotalPoints(), {centered: true, color: page.evaluation.getTotalPoints() > 20? chalk.green : chalk.red})
      
        
        this.showLines();

    }
    public execute(): void {
        this.clearTerminal();
        this.showText("TERMO PESQUISADO: " + this.searcher.searchTerm.toUpperCase(), {centered: true, backgroundColor: chalk.bgYellow})
        const results = this.searcher.rank();
        results.forEach((page, index) => {
            this.showPage(index++, page);
        })

        this.enterToContinue();
        this.viewHandler.goBackView();

    }
}