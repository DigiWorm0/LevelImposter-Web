import { ItemDB } from '../map/ItemDB.js'
import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'
import { ColliderGenerator } from './ColliderGenerator.js';
import { ToolbarHandler } from './ToolbarHandler.js';

export class PropertiesHandler {
	currentItem: Object;
	toolbar: ToolbarHandler;
	colliderGen: ColliderGenerator;

	constructor() {
		this.toolbar = new ToolbarHandler(this.currentItem);
		this.colliderGen = new ColliderGenerator(this.currentItem);
	}

	_inputGenerator(id: string, val: number): HTMLInputElement {
		let input = document.createElement("input");
		input.type = "number";
		input.id = id;
		input.setAttribute("value", val.toString());
		input.step = "any";
		return input;
	}

	load(item: Object) {
		// Current Item
		this.currentItem = item;
		this.colliderGen.currentItem = item;
		this.toolbar.currentItem = item;

		// Name
		let titleCard = document.createElement("div");
		titleCard.classList.add("list-group-item");
		titleCard.classList.add("bigger");

		// Image
		let itemImg = document.createElement("img");
		itemImg.src = item.sprite.data;
		itemImg.classList.add("item-img");
		titleCard.append(itemImg);
		titleCard.innerHTML += item.name;

		// Content 1
		let dataCard = document.createElement("div");
		dataCard.classList.add("list-group-item");

		// Content 2
		let panel = document.createElement("div");
		panel.classList.add("prop-side");

		// Input Labels
		let label1 = document.createElement("p");
		let label2 = document.createElement("p");
		let label3 = document.createElement("p");
		label1.innerText = "Position";
		label2.innerText = "Scale";
		label3.innerText = "Rotation";

		// Inputs
		let xInput = this._inputGenerator("xInput", item.x);
		let yInput = this._inputGenerator("yInput", item.y);
		let zInput = this._inputGenerator("zInput", item.z);
		let xSInput = this._inputGenerator("xSInput", item.xScale);
		let ySInput = this._inputGenerator("ySInput", item.yScale);
		let zRInput = this._inputGenerator("zRInput", item.rotation);

		// Append
		panel.append(label1);
		panel.innerHTML += "X";
		panel.append(xInput);
		panel.innerHTML += "Y";
		panel.append(yInput);
		panel.innerHTML += "Z";
		panel.append(zInput);
		panel.append(document.createElement("br"));
		panel.append(label2);
		panel.innerHTML += "X";
		panel.append(xSInput);
		panel.innerHTML += "Y";
		panel.append(ySInput);
		panel.append(document.createElement("br"));
		panel.append(label3);
		panel.innerHTML += "Z";
		panel.append(zRInput);
		dataCard.append(panel);
		$("#prop-name").empty();
		$("#prop-list").empty();
		$("#prop-name").append(titleCard);
		$("#prop-name").append(dataCard);

		// Collider Cards
		item.colliders.forEach(this.colliderGen.generateColliderCard.bind(this.colliderGen));

		// Add Collider Button
		if (!item.data.startsWith("util-vent")) {
			let cbtn = document.createElement("button");
			cbtn.classList.add("btn");
			cbtn.classList.add("btn-light");
			cbtn.classList.add("mb-2");
			cbtn.classList.add("mr-1");
			cbtn.type = "button";
			cbtn.innerText = "Add Collider";
			cbtn.onclick = item.addCollider.bind(item);
			$("#prop-list").append(cbtn);
		}

		// Add Vent Button
		if (item.data.startsWith("util-vent")) {
			let vbtn = document.createElement("button");
			vbtn.classList.add("btn");
			vbtn.classList.add("btn-light");
			vbtn.classList.add("mb-2");
			vbtn.classList.add("ml-1");
			vbtn.type = "button";
			vbtn.innerText = "Add Vent Connection";
			vbtn.onclick = item.addVentConnection.bind(item);
			$("#prop-list").append(vbtn);
		}

		// On Change
		$("#xInput").change(this.setValues.bind(this));
		$("#yInput").change(this.setValues.bind(this));
		$("#zInput").change(this.setValues.bind(this));
		$("#xSInput").change(this.setValues.bind(this));
		$("#ySInput").change(this.setValues.bind(this));
		$("#zRInput").change(this.setValues.bind(this));
	}

	setValues() {
		this.currentItem.x = parseFloat($("#xInput").val() as string);
		this.currentItem.y = parseFloat($("#yInput").val() as string);
		this.currentItem.z = parseFloat($("#zInput").val() as string);
		this.currentItem.xScale = parseFloat($("#xSInput").val() as string);
		this.currentItem.yScale = parseFloat($("#ySInput").val() as string);
		this.currentItem.rotation = parseFloat($("#zRInput").val() as string);
	}

	updateValues(item: Object) {
		$("#xInput").val(item.x);
		$("#yInput").val(item.y);
	}

	clear() {
		this.currentItem = undefined;
		this.colliderGen.currentItem = undefined;
		this.toolbar.currentItem = undefined;
		$("#prop-name").empty();
		$("#prop-list").empty();
		$("#trash").prop("disabled", true);
	}
}