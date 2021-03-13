import { MouseHandler } from "./MouseHandler.js";
import { UIHandler } from "../ui/UIHandler.js";
import { KeyboardHandler } from "./KeyboardHandler.js";
export class InputHandler {
    constructor() {
        InputHandler.mouse = new MouseHandler();
        InputHandler.ui = new UIHandler();
        InputHandler.key = new KeyboardHandler();
    }
}
//# sourceMappingURL=InputHandler.js.map