import chalk from "chalk";
import { Searcher } from "../../models/searcher.js";
import { View } from "./view.js";
import { ViewHandler } from "./viewHandler.js";
import { MultipliyerOptions } from "../../models/multipliyerOptions.js";
import { question } from "readline-sync";

export class AlterParamsView extends View {
    private searcher: Searcher;

    constructor(viewHandler: ViewHandler, searcher: Searcher){
        super(viewHandler);
        this.searcher = searcher;
    }

    public execute(): void {
        // Mostrar parâmetros atuais:
        const params = this.searcher.multipliers;
        this.showText("Parâmetros atuais: ", {color: chalk.yellowBright, centered: true});

        // Percorrer parâmetros
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                const value = params[param as keyof MultipliyerOptions]
                this.showText(`${this.modifyText(param, {color: chalk.yellow})}: ${value}`);
            }
        }

        // Perguntar qual quer que altere
        this.showText("Qual parâmetro você deseja alterar?  (em branco para sair) ", {centered: false, color: chalk.green});
        let desiredParam = question(">> ");
        if (!desiredParam){
            this.viewHandler.goBackView();
            return;
        }

        // Alterar os parâmetros no Search
        if(!params.hasOwnProperty(desiredParam)){
            this.showText("Parâmetro não encontrado", {centered: false, color: chalk.redBright})
            this.enterToContinue();
            this.viewHandler.goBackView();
            return;
        }
        this.showText(`${desiredParam.toUpperCase()} => ${params[desiredParam as keyof MultipliyerOptions]}`)
        let newValue: number | null = null;
        while(newValue == null) {
            newValue = Number(question("Qual o novo valor? "));

            if(isNaN(newValue)){
                newValue = null;
            }
        }
        
        params[desiredParam as keyof MultipliyerOptions] = newValue;
        this.showText(`Valor de ${this.modifyText(desiredParam, {color : chalk.yellowBright})} alterado para: ${this.modifyText(String(newValue))}`);
        this.enterToContinue();
        this.viewHandler.goBackView();
    }
    
}