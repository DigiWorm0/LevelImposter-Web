export class PanelToggleHandler {
    constructor() {
        $("#left-btn").click(this.toggleLeftPanel);
        $("#right-btn").click(this.toggleRightPanel);
    }
    toggleLeftPanel() {
        if ($("#left-panel").hasClass("close-left")) {
            $("#left-panel").removeClass("close-left");
            $("#left-btn").removeClass("close-left-btn");
        }
        else {
            $("#left-panel").addClass("close-left");
            $("#left-btn").addClass("close-left-btn");
        }
    }
    toggleRightPanel() {
        if ($("#right-panel").hasClass("close-right")) {
            $("#right-panel").removeClass("close-right");
            $("#right-btn").removeClass("close-right-btn");
        }
        else {
            $("#right-panel").addClass("close-right");
            $("#right-btn").addClass("close-right-btn");
        }
    }
}
//# sourceMappingURL=PanelToggleHandler.js.map