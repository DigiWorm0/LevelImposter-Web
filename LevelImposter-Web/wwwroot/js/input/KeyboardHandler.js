export class KeyboardHandler {
    constructor() {
        this.keys = {};
        // Event
        this.evt = new Event("LIKeyDown");
        // Key Down
        $(document).keydown(((e) => {
            this.keys[e.keyCode] = true;
            document.dispatchEvent(this.evt);
        }).bind(this));
        // Key Up
        $(document).keyup(((e) => {
            this.keys[e.keyCode] = false;
        }).bind(this));
    }
    get(keyCode) {
        return keyCode in this.keys ? this.keys[keyCode] : false;
    }
}
//# sourceMappingURL=KeyboardHandler.js.map