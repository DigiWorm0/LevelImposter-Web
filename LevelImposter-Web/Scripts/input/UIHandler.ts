import { ItemDB } from '../map/ItemDB.js'
import { MapHandler } from '../map/MapHandler.js'

export class UIHandler {
	leftPanel: boolean;
	rightPanel: boolean;

	constructor() {
		this.initItemDB();

		$("body").addClass("no-overflow");

		$("#left-btn").click(() => {
			this.toggleLeftPanel();
		});
		$("#right-btn").click(() => {
			this.toggleRightPanel();
		});
	}

	toggleLeftPanel() {
		this.leftPanel = !this.leftPanel;
		if ($("#left-panel").hasClass("close-left")) {
			$("#left-panel").removeClass("close-left");
			$("#left-btn").removeClass("close-left-btn");
		} else {
			$("#left-panel").addClass("close-left");
			$("#left-btn").addClass("close-left-btn");
		}
	}

	toggleRightPanel() {
		this.rightPanel = !this.rightPanel;
		if ($("#right-panel").hasClass("close-right")) {
			$("#right-panel").removeClass("close-right");
			$("#right-btn").removeClass("close-right-btn");
		} else {
			$("#right-panel").addClass("close-right");
			$("#right-btn").addClass("close-right-btn");
		}
	}

	initItemDB() {
		for (let typeID in ItemDB)
		{
			let dropdownOption = document.createElement("option");
			dropdownOption.value = typeID;
			dropdownOption.text = typeID;
			$("#item-dropdown").append(dropdownOption);
		}
		$("#item-dropdown").change(this.loadItemCategory);
		this.loadItemCategory();
	}

	loadItemCategory() {
		let value = $("#item-dropdown").val() as string;
		$("#item-list").empty();
		for (let itemID in ItemDB[value]) {
			let itemImg = document.createElement("img");
			itemImg.src = "/Sprites/" + itemID + ".png";
			itemImg.classList.add("item-img");

			let itemOption = document.createElement("button");
			itemOption.append(itemImg);
			itemOption.innerHTML += ItemDB[value][itemID];
			itemOption.classList.add("list-group-item");
			itemOption.classList.add("list-group-item-action");
			itemOption.type = "button";
			itemOption.onclick = () => {
				MapHandler.addExisting(itemID);
			};

			$("#item-list").append(itemOption);
		}
	}
}