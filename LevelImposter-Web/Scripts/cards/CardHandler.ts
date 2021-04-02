import { Object } from "../models/Object.js";
import { AdminGenerator } from "./AdminGenerator.js";
import { CardHelper } from "./CardHelper.js";
import { ColliderGenerator } from "./ColliderGenerator.js";
import { RoomGenerator } from "./RoomGenerator.js";
import { SabGenerator } from "./SabGenerator.js";
import { TransformGenerator } from "./TransformGenerator.js";

export class CardHandler {
	transformGen: TransformGenerator;
	colliderGen: ColliderGenerator;
	roomGen: RoomGenerator;
	adminGen: AdminGenerator;
	sabGen: SabGenerator;

	constructor() {
		this.transformGen = new TransformGenerator();
		this.colliderGen = new ColliderGenerator();
		this.roomGen = new RoomGenerator();
		this.adminGen = new AdminGenerator();
		this.sabGen = new SabGenerator();
	}

	load(obj: Object) {
		this.clear();

		// Cards
		this.transformGen.generate(obj);
		this.roomGen.generate(obj);
		this.adminGen.generate(obj);
		this.sabGen.generate(obj);
		this.colliderGen.generate(obj);

		// Bottom Buttons
		let colliderButton = CardHelper.genBottomButton("Add Collider");
		colliderButton.onclick = obj.addCollider.bind(obj);
		CardHelper.append(colliderButton);
	}

	clear() {
		$("#prop-name").empty();
		$("#prop-list").empty();
		$("#trash").prop("disabled", true);
	}
}