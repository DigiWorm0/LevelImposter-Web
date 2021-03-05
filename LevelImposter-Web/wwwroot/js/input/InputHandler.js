import { MouseHandler } from "./MouseHandler.js";
import { UIHandler } from "./UIHandler.js";
export class InputHandler {
    constructor() {
        InputHandler.mouse = new MouseHandler();
        InputHandler.ui = new UIHandler();
    }
}
//# sourceMappingURL=InputHandler.js.map