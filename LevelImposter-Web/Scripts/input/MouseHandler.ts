export class MouseHandler {
	left: boolean;
	middle: boolean;
	right: boolean;
	hover: boolean;
	x: number;
	y: number;

	constructor() {
		// Defaults
		this.left = false;
		this.middle = false;
		this.right = false;
		this.hover = false;
		this.x = 0;
		this.y = 0;

		$("licanvas").mouseenter(() => {
			this.hover = true;
		});

		$("licanvas").mouseleave(() => {
			this.hover = false;
		});

		$(document).mousemove(((e: JQuery.MouseMoveEvent) => {
			this.x = e.pageX;
			this.y = e.pageY - 120;
			this.hover = true;
		}).bind(this));

		// Mouse Down
		$("#licanvas").mousedown(((e: JQuery.MouseDownEvent) => {
			switch (e.which) {
				case 1:
					this.left = true;
					break;
				case 2:
					this.middle = true;
					break;
				case 3:
					this.right = true;
					break;
			}
		}).bind(this));

		// Mouse Up
		$("#licanvas").mouseup(((e: JQuery.MouseUpEvent) => {
			switch (e.which) {
				case 1:
					this.left = false;
					break;
				case 2:
					this.middle = false;
					break;
				case 3:
					this.right = false;
					break;
			}
		}).bind(this));

		// Disable Context Menu
		$("#licanvas").bind("contextmenu", function (e: JQuery.ContextMenuEvent) {
			return false;
		});
	}

	setCursor(type: string) {
		$("body").css("cursor", type);
	}
}