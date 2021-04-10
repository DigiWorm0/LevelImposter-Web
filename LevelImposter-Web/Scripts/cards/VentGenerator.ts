import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { Object } from "../models/Object.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";

export class VentGenerator implements CardGenerator {

	initialState: Object;

	generate(obj: Object): void {
		if (!obj.type.startsWith("util-vent"))
			return;

		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Vent Info");
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("specialdata");

		// Inputs
		let names: string[] = ["No Connection"];
		let values: string[] = ["-1"];
		if (obj.targetIds.length <= 2)
			obj.targetIds = [-1, -1, -1];
		let target1 = obj.targetIds[0];
		let target2 = obj.targetIds[1];
		let target3 = obj.targetIds[2];
		for (let i = 0; i < MapHandler.map.objs.length; i++) {
			let obj2 = MapHandler.map.objs[i];
			if (obj2.type.startsWith("util-vent") && obj.id != obj2.id) {
				names.push(obj2.name);
				values.push(obj2.id.toString());
			}
		}
		let nameInput = CardHelper.genTxtInput("ventNameInput", obj.name);
		let ventInput1 = CardHelper.genDropdown(names, values, target1.toString(), "ventInput1");
		let ventInput2 = CardHelper.genDropdown(names, values, target2.toString(), "ventInput2");
		let ventInput3 = CardHelper.genDropdown(names, values, target3.toString(), "ventInput3");

		// Labels
		let nameLabel = CardHelper.genP("Name");
		let ventLabel1 = CardHelper.genP("Vent 1");
		let ventLabel2 = CardHelper.genP("Vent 2");
		let ventLabel3 = CardHelper.genP("Vent 3");

		// Children
		contentCard.append(nameLabel);
		contentCard.append(nameInput);
		contentCard.append(ventLabel1);
		contentCard.append(ventInput1);
		contentCard.append(ventLabel2);
		contentCard.append(ventInput2);
		contentCard.append(ventLabel3);
		contentCard.append(ventInput3);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);

		// On Change
		$("#ventNameInput").change(this.setValues.bind(this));
		$("#ventInput1").change(this.setValues.bind(this));
		$("#ventInput2").change(this.setValues.bind(this));
		$("#ventInput3").change(this.setValues.bind(this));

		this.initialState = obj.clone();
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();

		currentItem.name = $("#ventNameInput").val() as string;
		currentItem.targetIds[0] = parseInt($("#ventInput1").val() as string);
		currentItem.targetIds[1] = parseInt($("#ventInput2").val() as string);
		currentItem.targetIds[2] = parseInt($("#ventInput3").val() as string);

		$("#obj-title").text(currentItem.name);

		ActionHandler.add(new ChangeAction(this.initialState, currentItem));
		this.initialState = currentItem.clone();
	}
}