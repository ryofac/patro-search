import { Stack } from "./stack.js";
/**
 * Classe que organiza a pilha de Views.
 */
export class ViewHandler {
    constructor() {
        /**
         * Pilha de Views
         */
        this.viewStack = new Stack;
    }
    /**
     * Adiciona uma View à pilha.
     * @param desiredView - A View a ser adicionada.
     */
    goToView(desiredView) {
        this.viewStack.push(desiredView);
    }
    /**
     * Remove e retorna a última View da pilha.
     * @returns A última View na pilha, ou undefined se a pilha estiver vazia.
     */
    goBackView() {
        const lastView = this.viewStack.pop();
        return lastView;
    }
    /**
     * Checa se a pilha está vazia.
     * @returns true se a pilha estiver vazia, false caso contrário.
     */
    isEmpty() {
        return this.viewStack.isEmpty();
    }
    /**
     * Retorna a última View da pilha sem a remover.
     * @returns A última View na pilha, ou undefined se a pilha estiver vazia.
     */
    getActualView() {
        return this.viewStack.peek();
    }
}
