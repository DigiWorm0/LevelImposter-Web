import { InputHandler } from "../InputHandler.js";
import { Action } from "./Action.js";

export class ActionHandler {
	static actionDB: Array<Action> = [];
	static index: number = -1;
	static hasChanged: boolean = false;

	static update() {
		if (InputHandler.key.get(17)) {
			if (InputHandler.key.get(90)) {
				if (!this.hasChanged)
					this.undo();
				this.hasChanged = true;
			}
			else if (InputHandler.key.get(89))
			{
				if (!this.hasChanged)
					this.redo();
				this.hasChanged = true;
			}
			else
			{
				this.hasChanged = false;
			}
		}
	}

	static add(action: Action) {
		this._trim();
		this.actionDB.push(action);
		this.index = this.actionDB.length - 1;
		
	}

	static undo() {
		if (this.index < 0)
			return;
		this.actionDB[this.index].undo();
		this.index--;
	}

	static redo() {
		if (this.index >= this.actionDB.length - 1)
			return;
		this.actionDB[this.index + 1].redo();
		this.index++;
	}

	static _trim() {
		this.actionDB.splice(this.index + 1);
	}
}