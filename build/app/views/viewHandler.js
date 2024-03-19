import { Stack } from "./stack.js";
export class ViewHandler {
    constructor() {
        this.viewStack = new Stack;
    }
    goToView(desiredView) {
        this.viewStack.push(desiredView);
    }
    goBackView() {
        const lastView = this.viewStack.pop();
        return lastView;
    }
    isEmpty() {
        return this.viewStack.isEmpty();
    }
    getActualView() {
        return this.viewStack.peek();
    }
}
