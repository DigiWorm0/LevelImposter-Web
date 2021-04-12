import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { Object } from "../models/Object.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";

export class CamGenerator implements CardGenerator {

	initialState: Object;

	generate(obj: Object): void {
		if (obj.type != "util-cam")
			return;

		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Camera Info");
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("specialdata");

		// Inputs
		let nameInput = CardHelper.genTxtInput("camNameInput", obj.name);

		// Labels
		let nameLabel = CardHelper.genP("Name");

		// Children
		contentCard.append(nameLabel);
		contentCard.append(nameInput);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);

		// On Change
		$("#camNameInput").change(this.setValues.bind(this));

		this.initialState = obj.clone();
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();

		currentItem.name = $("#camNameInput").val() as string;

		$("#obj-title").text(currentItem.name);

		ActionHandler.add(new ChangeAction(this.initialState, currentItem));
		this.initialState = currentItem.clone();
	}
}