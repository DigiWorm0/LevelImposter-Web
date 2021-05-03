import { Object } from "../models/Object.js";
import { AdminGenerator } from "./AdminGenerator.js";
import { CamGenerator } from "./CamGenerator.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";
import { ColliderGenerator } from "./ColliderGenerator.js";
import { RoomGenerator } from "./RoomGenerator.js";
import { TaskGenerator } from "./TaskGenerator.js";
import { TransformGenerator } from "./TransformGenerator.js";
import { UtilGenerator } from "./UtilGenerator.js";
import { VentGenerator } from "./VentGenerator.js";

export class CardHandler {
	generators: CardGenerator[];

	constructor() {
		this.generators = [
			new TransformGenerator(),
			new ColliderGenerator(),
			new RoomGenerator(),
			new AdminGenerator(),
			new TaskGenerator(),
			new VentGenerator(),
			new CamGenerator(),
			new UtilGenerator()
		];
	}

	load(obj: Object) {
		this.clear();

		// Cards
		for (var i = 0; i < this.generators.length; i++) {
			this.generators[i].generate(obj);
		}

		// Bottom Buttons
		let colliderButton = CardHelper.genBottomButton("Add Collider");
		colliderButton.onclick = obj.addCollider.bind(obj);
		CardHelper.append(colliderButton);
	}

	clear() {
		$("#prop-name").empty();
		$("#prop-list").empty();
	}
}