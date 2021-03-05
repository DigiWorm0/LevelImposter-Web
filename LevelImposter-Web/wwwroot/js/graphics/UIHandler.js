export class UIHandler {
    constructor() {
        $("#left-btn").click(() => {
            this.toggleLeftPanel();
        });
        $("#right-btn").click(() => {
            this.toggleRightPanel();
        });
    }
    toggleLeftPanel() {
        this.leftPanel = !this.leftPanel;
        $("#left-panel").toggleClass("close-left");
    }
    toggleRightPanel() {
        this.rightPanel = !this.rightPanel;
    }
}
//# sourceMappingURL=UIHandler.js.map