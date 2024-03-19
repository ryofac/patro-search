import { Stack } from "./stack.js";
import { View } from "./view.js";

/**
 * Classe que organiza a pilha de Views.
 */
export class ViewHandler {
    /**
     * Pilha de Views
     */
    viewStack: Stack<View> = new Stack;

    /**
     * Adiciona uma View à pilha.
     * @param desiredView - A View a ser adicionada.
     */
    goToView(desiredView: View): void {
        this.viewStack.push(desiredView);
    }

    /**
     * Remove e retorna a última View da pilha.
     * @returns A última View na pilha, ou undefined se a pilha estiver vazia.
     */
    goBackView(): View | undefined {
        const lastView = this.viewStack.pop();
        return lastView;
    }

    /**
     * Checa se a pilha está vazia.
     * @returns true se a pilha estiver vazia, false caso contrário.
     */
    isEmpty(): boolean {
        return this.viewStack.isEmpty();
    }
    
    /**
     * Retorna a última View da pilha sem a remover.
     * @returns A última View na pilha, ou undefined se a pilha estiver vazia.
     */
    getActualView(): View | undefined {
        return this.viewStack.peek();
    }
}