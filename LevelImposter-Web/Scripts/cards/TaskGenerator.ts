import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { Object } from "../models/Object.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";

export class TaskGenerator implements CardGenerator {

	initialState: Object;

	generate(obj: Object): void {
		if (!obj.type.startsWith("task-"))
			return;

		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Task Info");
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("specialdata");

		// Inputs
		let names: string[] = [];
		let values: string[] = [];
		let target = obj.targetIds.length <= 0 ? 0 : obj.targetIds[0];
		for (let i = 0; i < MapHandler.map.objs.length; i++) {
			let obj2 = MapHandler.map.objs[i];
			if (obj2.type == "util-room") {
				names.push(obj2.name);
				values.push(obj2.id.toString());
			}
		}
		let roomInput = CardHelper.genDropdown(names, values, target.toString(), "roomInput");

		// Labels
		let nameLabel = CardHelper.genP("Room");
		let descLabel = CardHelper.genP("Tasks need a room to link to in order to display on the task map.");
		descLabel.style.width = "100%";
		descLabel.style.margin = "2px";
		descLabel.style.textAlign = "center";

		// Children
		contentCard.append(nameLabel);
		contentCard.append(roomInput);
		contentCard.append(descLabel);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);

		// On Change
		$("#roomInput").change(this.setValues.bind(this));

		this.initialState = obj.clone();
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();
		let id = $("#roomInput").val() as string;

		currentItem.targetIds = [
			parseInt(id)
		];

		ActionHandler.add(new ChangeAction(this.initialState, currentItem));
		this.initialState = currentItem.clone();
	}
}