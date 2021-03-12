import { Point } from "./Point.js";
import { Object } from "./Object.js";

export class Collider {

	blocksLight: boolean;
	points: Point[];

	constructor(parent: Object) {
		let parentRect = parent.getRect();

		this.blocksLight = true;
		this.points = [
			new Point(parentRect.w / -2, parentRect.h / -2),
			new Point(parentRect.w / 2, parentRect.h / -2),
			new Point(parentRect.w / -2, parentRect.h / 2),
			new Point(parentRect.w / 2, parentRect.h / 2)
		];
	}
};