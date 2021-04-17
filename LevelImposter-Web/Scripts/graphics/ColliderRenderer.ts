import { ColliderEditor } from "../map/ColliderEditor.js";
import { Collider } from "../models/Collider.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class ColliderRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawCollider() {
		if (!ColliderEditor.isEditing)
			return;

		// Draw Lines
		let colliderPts = ColliderEditor.getPts();
		for (let i = 0; i < colliderPts.length - 1; i++) {
			let p1 = colliderPts[i];
			let p2 = colliderPts[i + 1];
			this.renderer.drawLine(p1, p2, ColliderEditor.closestIndex == i && !ColliderEditor.onEdge ? "#00ff00" : "green");
		}
		if (ColliderEditor.getClosed()) {
			this.renderer.drawLine(colliderPts[0], colliderPts[colliderPts.length - 1], ColliderEditor.closestIndex == colliderPts.length - 1 && !ColliderEditor.onEdge ? "#00ff00" : "green");
		}

		// Draw Point
		ColliderEditor.update(this.renderer.cam);

		if (ColliderEditor.closestIndex != -1) {
			let pt = ColliderEditor.closestPt;
			let color = ColliderEditor.onEdge ? "red" : "green";
			this.renderer.drawRect({
				x: pt.x,
				y: pt.y,
				w: .1 / this.renderer.cam.zoom,
				h: .1 / this.renderer.cam.zoom
			}, 0, color, color);
		}
	}
}