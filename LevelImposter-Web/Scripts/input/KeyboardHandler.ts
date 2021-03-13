export class KeyboardHandler {
	keys: any = {};
	evt: Event;

	constructor() {
		// Event
		this.evt = new Event("LIKeyDown");

		// Key Down
		$(document).keydown(((e: JQuery.KeyDownEvent) => {
			this.keys[e.keyCode] = true;
			document.dispatchEvent(this.evt);
		}).bind(this));

		// Key Up
		$(document).keyup(((e: JQuery.KeyUpEvent) => {
			this.keys[e.keyCode] = false;
		}).bind(this));
	}

	get(keyCode: number): boolean {
		return keyCode in this.keys ? this.keys[keyCode] : false;
	}
}