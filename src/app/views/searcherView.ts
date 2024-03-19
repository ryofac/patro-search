import { invalidSearchTermError } from "../../err/invalidSearchTermError.js";
import { Searcher } from "../../models/searcher.js";
import { ResultView } from "./resultView.js";
import { View } from "./view.js";
import { ViewHandler } from "./viewHandler.js";
import chalk from "chalk";

export class SearcherView extends View {

    EXIT: number = 0;
    searcher: Searcher;

    constructor(viewHandler: ViewHandler, searcher: Searcher){
        super(viewHandler);
        this.searcher = searcher;
    }

    public execute(): void {
        this.showLines();
        this.showText("PATRO SEARCH: ", {centered : true, color: chalk.blueBright});
        this.showLines();
        this.showText("Digite o termo da sua busca: ", {centered: true});
        this.showText("(0 para sair)", {centered: true, color: chalk.white});

        try {
            const searchTerm = this.getInput();
            if(Number(searchTerm) === this.EXIT){
                this.viewHandler.goBackView();
                return;
            }
            this.searcher.search(searchTerm);
            this.viewHandler.goToView(new ResultView(this.viewHandler, this.searcher));
            
        } catch (error) {
            if(error instanceof invalidSearchTermError){
                this.showText("TERMO DE BUSCA INVÁLIDO!", {color: chalk.redBright, centered:true})
                this.enterToContinue();
            }
            
        }
        

        
    }
    
}