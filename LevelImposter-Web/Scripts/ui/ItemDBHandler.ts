import { ItemDB } from '../map/ItemDB.js'
import { MapHandler } from '../map/MapHandler.js'

export class ItemDBHandler {

	constructor() {
		// Dropdown Options
		for (let typeID in ItemDB) {
			let dropdownOption = document.createElement("option");
			dropdownOption.value = typeID;
			dropdownOption.text = typeID;
			$("#item-dropdown").append(dropdownOption);
		}

		// Load Category
		$("#item-dropdown").change(this.loadCategory);
		this.loadCategory();
	}

	loadCategory() {
		// Get Category
		let value = $("#item-dropdown").val() as string;
		$("#item-list").empty();

		// Add Each Item
		for (let itemID in ItemDB[value]) {
			// Name
			let name = ItemDB[value][itemID];

			// Image
			let itemImg = document.createElement("img");
			itemImg.src = "/Sprites/" + itemID + ".png";

			// Button
			let itemOption = document.createElement("button");
			itemOption.append(itemImg);
			itemOption.innerHTML += name;
			itemOption.classList.add("list-group-item");
			itemOption.classList.add("list-group-item-action");
			itemOption.type = "button";
			itemOption.onclick = () => {
				MapHandler.addExisting(name, itemID);
			};

			$("#item-list").append(itemOption);
		}
	}

}