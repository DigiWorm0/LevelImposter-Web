import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { Object } from "../models/Object.js";
import { CardGenerator } from "./CardGenerator.js";
import { CardHelper } from "./CardHelper.js";

export class UtilGenerator implements CardGenerator {

	initialState: Object;

	generate(obj: Object): void {
		if (!obj.type.startsWith("util-") ||
			obj.type.startsWith("util-vent") ||
			obj.type.startsWith("util-spawn") ||
			obj.type == "util-player" ||
			obj.type == "util-cam" ||
			obj.type == "util-room" ||
			obj.type == "util-admin")
			return;

		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Util Info");
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("specialdata");

		// Checkbox
		let checkbox1 = CardHelper.genCheckbox("util-checkbox1", obj.onlyFromBottom, "Only From Below");
		(checkbox1.firstChild as HTMLInputElement).onchange = (() => {
			obj.onlyFromBottom = (document.getElementById("util-checkbox1") as HTMLInputElement).checked;
		}).bind(this);

		// Children
		contentCard.append(checkbox1);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);

		this.initialState = obj.clone();
	}
}