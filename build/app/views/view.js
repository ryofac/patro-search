import { question } from "readline-sync";
import chalk from "chalk";
/**
 * Classe abstrata que representa uma View.
 */
export class View {
    /**
     * Construtor da classe.
     * @param viewHandler - Referência do gerenciador de views.
     */
    constructor(viewHandler) {
        this.viewHandler = viewHandler;
    }
    /**
     * Muda a view atual para a view desejada.
     * @param desiredView - A view desejada.
     */
    changeView(desiredView) {
        this.viewHandler.goToView(desiredView);
    }
    /**
     * Retorna para a view anterior, removendo o topo da pilha.
     */
    returnView() {
        this.viewHandler.goBackView();
    }
    /**
     * Retorna a largura do terminal.
     * @returns A largura do terminal.
     */
    getWidth() {
        return process.stdout.columns;
    }
    /**
     * Exibe um texto na tela, podendo opcionalmente fazer uso de um dicionário de TextOptions.
     * @param text Texto a ser exibido.
     * @param options TextOptions a serem aplicadas ao texto.
     */
    showText(text, options = {}) {
        // Cria variáveis com as propriedades das opções, caso existam.
        const { color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false } = options;
        // Modificando o texto com as opções desejadas.
        var printText = backgroundColor(color(text));
        // Se o texto deve ser centralizado, calcula o padding necessário.
        if (centered) {
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            printText = ' '.repeat(padding) + printText + ' '.repeat(padding);
        }
        // Exibindo o texto.
        console.log(printText);
    }
    /**
     * Modifica um texto com as opções desejadas.
     * @param text Texto a ser modificado.
     * @param options TextOptions a serem aplicadas ao texto.
     * @returns O texto modificado.
     */
    modifyText(text, options = {}) {
        // Cria variáveis com as propriedades das opções, caso existam.
        const { color = chalk.whiteBright, backgroundColor = chalk.blackBright, centered = false } = options;
        // Modificando o texto com as opções desejadas.
        var modified = backgroundColor(color(text));
        // Se o texto deve ser centralizado, calcula o padding necessário.
        if (centered) {
            const width = this.getWidth();
            const padding = Math.max(0, Math.floor((width - text.length) / 2));
            modified = ' '.repeat(padding) + modified + ' '.repeat(padding);
        }
        return modified;
    }
    /** Limpa o Terminal */
    clearTerminal() {
        console.clear();
    }
    /** Move o Cursor para a linha desejada. */
    moveCursorToLine(lineNumber) {
        // process.stdout.write(`\x1b[${lineNumber}H`);
        process.stdout.cursorTo(0, lineNumber);
    }
    /** Move o Cursor para a linha anterior. */
    moveCursorToAnteriorLine() {
        process.stdout.moveCursor(0, -1);
    }
    /** Aguarda a ação do usuário para avançar a execução do programa. */
    enterToContinue() {
        this.showText("[ PRESSIONE ENTER PARA CONTINUAR ] ", { centered: true, backgroundColor: chalk.bgWhiteBright, color: chalk.blackBright });
        this.moveCursorToAnteriorLine();
        question("", {
            hideEchoBack: true,
            mask: ""
        });
        this.clearTerminal();
    }
    /** Desenha uma divisória horizontal */
    showLines() {
        console.log('');
        for (let i = 0; i < Math.floor(this.getWidth() / 2); i++) {
            process.stdout.write("=-");
        }
        console.log('');
    }
    /**
     * Recebe um input do usuário.
     * @returns O input do usuário, em string.
     */
    getInput() {
        return question("> ").trimStart().trimEnd();
    }
}
