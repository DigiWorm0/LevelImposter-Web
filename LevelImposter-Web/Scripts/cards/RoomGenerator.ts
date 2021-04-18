import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { Object } from "../models/Object.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";

export class RoomGenerator implements CardGenerator {

	initialState: Object;

	generate(obj: Object): void {
		if (obj.type != "util-room")
			return;

		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Room Info");
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("specialdata");

		// Inputs
		let nameInput = CardHelper.genTxtInput("roomNameInput", obj.name);

		// Labels
		let descLabel = CardHelper.genP("Rooms are used for admin table, map, and sabotages. Add a collider surrounding the room if you want the room to show up on admin table.");
		descLabel.style.width = "100%";
		descLabel.style.margin = "2px";
		descLabel.style.textAlign = "center";

		// Children
		contentCard.append(nameInput);
		contentCard.append(descLabel);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);

		// On Change
		$("#roomNameInput").change(this.setValues.bind(this));

		this.initialState = obj.clone();
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();

		currentItem.name = $("#roomNameInput").val() as string;

		$("#obj-title").text(currentItem.name);

		ActionHandler.add(new ChangeAction(this.initialState, currentItem));
		this.initialState = currentItem.clone();
	}
}