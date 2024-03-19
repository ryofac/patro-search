import { Stack } from "./stack.js";
import { View } from "./view.js";

export class ViewHandler {
    viewStack: Stack<View> = new Stack;
    goToView(desiredView: View){
        this.viewStack.push(desiredView);
    }

    goBackView(): View | undefined {
        const lastView = this.viewStack.pop();
        return lastView;
    }

    isEmpty(): boolean {
        return this.viewStack.isEmpty();
    }
    
    getActualView(): View | undefined {
        return this.viewStack.peek();
    }

}