import { CardGenerator } from './CardGenerator.js';
import { CardHelper } from './CardHelper.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { Object } from '../models/Object.js'

export class TransformGenerator implements CardGenerator {

	generate(obj: Object): void {
		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle(obj.name);
		let imgCard = CardHelper.genImg(obj.sprite.data);
		let contentCard = CardHelper.genContent();
		contentCard.classList.add("transform");
		titleCard.id = "obj-title";

		// Inputs
		let xInput = CardHelper.genNumInput("xInput", obj.x);
		let yInput = CardHelper.genNumInput("yInput", obj.y);
		let zInput = CardHelper.genNumInput("zInput", obj.z);
		let xSInput = CardHelper.genNumInput("xSInput", obj.xScale);
		let ySInput = CardHelper.genNumInput("ySInput", obj.yScale);
		let zRInput = CardHelper.genNumInput("zRInput", obj.rotation);

		// Labels
		let label1 = CardHelper.genP("Position");
		let label2 = CardHelper.genP("Scale");
		let label3 = CardHelper.genP("Rotation");

		// Children
		contentCard.append(label1);
		contentCard.innerHTML += "X";
		contentCard.append(xInput);
		contentCard.innerHTML += "Y";
		contentCard.append(yInput);
		contentCard.innerHTML += "Z";
		contentCard.append(zInput);
		contentCard.append(document.createElement("br"));
		contentCard.append(label2);
		contentCard.innerHTML += "X";
		contentCard.append(xSInput);
		contentCard.innerHTML += "Y";
		contentCard.append(ySInput);
		contentCard.append(document.createElement("br"));
		contentCard.append(label3);
		contentCard.innerHTML += "Z";
		contentCard.append(zRInput);
		titleCard.insertBefore(imgCard, titleCard.firstChild);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);

		CardHelper.append(baseCard);

		// On Change
		$("#xInput").change(this.setValues.bind(this));
		$("#yInput").change(this.setValues.bind(this));
		$("#zInput").change(this.setValues.bind(this));
		$("#xSInput").change(this.setValues.bind(this));
		$("#ySInput").change(this.setValues.bind(this));
		$("#zRInput").change(this.setValues.bind(this));
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();

		currentItem.x = parseFloat($("#xInput").val() as string);
		currentItem.y = parseFloat($("#yInput").val() as string);
		currentItem.z = parseFloat($("#zInput").val() as string);
		currentItem.xScale = parseFloat($("#xSInput").val() as string);
		currentItem.yScale = parseFloat($("#ySInput").val() as string);
		currentItem.rotation = parseFloat($("#zRInput").val() as string);
	}

	updateValues(obj: Object): void {
		$("#xInput").val(obj.x);
		$("#yInput").val(obj.y);
	}
}