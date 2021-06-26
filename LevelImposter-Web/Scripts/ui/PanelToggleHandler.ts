export class PanelToggleHandler {
	constructor() {
		$("#left-btn").click(this.toggleLeftPanel);
		$("#right-btn").click(this.toggleRightPanel);

		this.checkHideURL();
	}

	checkHideURL() {
		let params = new URLSearchParams(window.location.search);

		if (!params.has("hidecontrols"))
			return;

		$("#left-panel").hide();
		$("#left-btn").hide();
		$("#right-panel").hide();
		$("#right-btn").hide();
		$(".header-1").hide();
		$(".header-2").hide();

		$("#licanvas").css("top", "0");
		$("#licanvas").css("height", "100vh");
	}

	toggleLeftPanel() {
		if ($("#left-panel").hasClass("close-left")) {
			$("#left-panel").removeClass("close-left");
			$("#left-btn").removeClass("close-left-btn");
		} else {
			$("#left-panel").addClass("close-left");
			$("#left-btn").addClass("close-left-btn");
		}
	}

	toggleRightPanel() {
		if ($("#right-panel").hasClass("close-right")) {
			$("#right-panel").removeClass("close-right");
			$("#right-btn").removeClass("close-right-btn");
		} else {
			$("#right-panel").addClass("close-right");
			$("#right-btn").addClass("close-right-btn");
		}
	}
}