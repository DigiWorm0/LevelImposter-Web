import { MouseHandler } from "./MouseHandler.js";
import { UIHandler } from "../ui/UIHandler.js";

export class InputHandler {
	static mouse: MouseHandler;
	static ui: UIHandler;

	constructor() {
		InputHandler.mouse = new MouseHandler();
		InputHandler.ui = new UIHandler();
	}
}