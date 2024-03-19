import { question } from "readline-sync";
import chalk from "chalk";
export class View {
    constructor(viewHandler) {
        this.viewHandler = viewHandler;
    }
    changeView(desiredView) {
        this.viewHandler.goToView(desiredView);
    }
    returnView() {
        this.viewHandler.goBackView();
    }
    getWidth() {
        return process.stdout.columns;
    }
    showText(text, options = {}) {
        // Atribuindo os valores dicionario de opções, desenpacotando, se existirem;
        const { color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false } = options;
        var printText = backgroundColor(color(text));
        if (centered) {
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            printText = ' '.repeat(padding) + printText + ' '.repeat(padding);
        }
        console.log(printText);
    }
    modifyText(text, options = {}) {
        const { color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false } = options;
        var modifiyed = backgroundColor(color(text));
        if (centered) {
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            modifiyed = ' '.repeat(padding) + modifiyed + ' '.repeat(padding);
        }
        return modifiyed;
    }
    clearTerminal() {
        console.clear();
    }
    moveCursorToLine(lineNumber) {
        process.stdout.write(`\x1b[${lineNumber}H`);
    }
    moveCursorToAnteriorLine() {
        process.stdout.write('\x1b[F');
    }
    enterToContinue() {
        this.showText("[ PRESSIONE ENTER PARA CONTINUAR ] ", { centered: true, backgroundColor: chalk.bgWhiteBright, color: chalk.blackBright });
        this.moveCursorToAnteriorLine();
        question("", {
            hideEchoBack: true,
            mask: ""
        });
        this.clearTerminal();
    }
    showLines() {
        console.log('');
        for (let i = 0; i < Math.floor(this.getWidth() / 2); i++) {
            process.stdout.write("=-");
        }
        console.log('');
    }
    getInput() {
        return question("> ").trimStart().trimEnd();
    }
}
