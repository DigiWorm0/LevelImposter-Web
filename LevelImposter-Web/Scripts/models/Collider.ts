import { Point } from "./Point.js";
import { Object } from "./Object.js";

export class Collider {

	blocksLight: boolean;
	isClosed: boolean;
	points: Point[];

	constructor(parent?: Object) {
		this.blocksLight = true;
		this.isClosed = true;
		this.points = [];

		if (parent == undefined)
			return;

		let parentRect = parent.getRect();
		parentRect.w /= parent.xScale;
		parentRect.h /= parent.yScale;
		this.points = [
			new Point(parentRect.w / -2, parentRect.h / -2),
			new Point(parentRect.w / 2, parentRect.h / -2),
			new Point(parentRect.w / 2, parentRect.h / 2),
			new Point(parentRect.w / -2, parentRect.h / 2),
		];
	}

	clone(): Collider {
		let clone = new Collider();

		clone.blocksLight = this.blocksLight;
		this.points.forEach((p) => {
			clone.points.push(new Point(p.x, p.y));
		});

		return clone;
	}
};