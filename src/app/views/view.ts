import { question } from "readline-sync";
import { ViewHandler } from "./viewHandler.js";

import chalk, { Chalk, ColorName } from "chalk";

interface TextOptions {
    color?: CallableFunction;
    backgroundColor?: CallableFunction;
    centered?: boolean;
}

export abstract class View {

    viewHandler : ViewHandler;

    constructor(viewHandler: ViewHandler) {
        this.viewHandler = viewHandler;
    }

    changeView(desiredView: View): void {
        this.viewHandler.goToView(desiredView);
    }

    returnView(): void {
        this.viewHandler.goBackView();
    }

    getWidth() : number {
        return process.stdout.columns;
    }

    showText(text: string, options: TextOptions = {}) : void {
        // Atribuindo os valores dicionario de opções, desenpacotando, se existirem;
        const {color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false} = options;

        var printText = backgroundColor(color(text));

        if(centered){
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            printText =  ' '.repeat(padding) + printText + ' '.repeat(padding);
        }

        console.log(printText)
        
    }

    modifyText(text: string, options: TextOptions = {}): string{
        const {color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false} = options;

        var modifiyed = backgroundColor(color(text));

        if(centered){
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            modifiyed =  ' '.repeat(padding) + modifiyed + ' '.repeat(padding);
        }

        return modifiyed;

    }

    clearTerminal(): void {
        console.clear();
        console.clear();
    }

    moveCursorToLine(lineNumber: number): void{
        process.stdout.write(`\x1b[${lineNumber}H`);
    }

    moveCursorToAnteriorLine(): void{
        process.stdout.write('\x1b[F');

    }

    enterToContinue() {
        this.showText("[ PRESSIONE ENTER PARA CONTINUAR ] ", {centered : true, backgroundColor : chalk.bgWhiteBright, color : chalk.blackBright});
        this.moveCursorToAnteriorLine();
        question("", {
            hideEchoBack: true,
            mask: ""
        });

        this.clearTerminal();
    }

    showLines() {
        console.log('');
        for(let i = 0; i < Math.floor(this.getWidth() /  2); i++){
            process.stdout.write("=-");
        }
        console.log('');
    }

    getInput(): string {
        return question("> ").trimStart().trimEnd();
    }




    public abstract execute(): void;
}