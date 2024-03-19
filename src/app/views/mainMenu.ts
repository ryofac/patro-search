import { question } from "readline-sync";
import { View } from "./view.js";
import chalk from "chalk";
import { Searcher } from "../../models/searcher.js";
import { SearcherView } from "./searcherView.js";
import { ViewHandler } from "./viewHandler.js";
import { AlterParamsView } from "./alterParamsView.js";

export class MainMenuView extends View {

    private searcher: Searcher;

    constructor(viewHandler: ViewHandler, searcher: Searcher){
        super(viewHandler)
        this.searcher = searcher

    }


    async execute(): Promise<void> {
       this.clearTerminal();
       
       this.showText("BUSCADOR ", {color: chalk.blueBright, centered: true})
       this.showText("1 - BUSCAR")
       this.showText("2 - Alterar critérios de rankeamento")
       this.showText("0 - Sair da aplicação")

        const mainMenuOption = Number(question("> "));  
        this.selectView(mainMenuOption);
    }
    

    private selectView(optionNumber: number) : void {
        this.clearTerminal();

        switch(optionNumber){
            case 0:
                this.viewHandler.goBackView();
                this.showText("Fim do programa!", {color: chalk.redBright, centered: true});
                break;  
                
            case 1:
                this.viewHandler.goToView(new SearcherView(this.viewHandler, this.searcher));
                break;
            
            case 2:
                this.viewHandler.goToView(new AlterParamsView(this.viewHandler, this.searcher));
                break;
            
        }

    }

}   