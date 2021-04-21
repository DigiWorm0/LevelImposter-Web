import { CardGenerator } from './CardGenerator.js';
import { CardHelper } from './CardHelper.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { Object } from '../models/Object.js'
import { ActionHandler } from '../input/Actions/ActionHandler.js';
import { ChangeAction } from '../input/Actions/ChangeAction.js';

export class TransformGenerator implements CardGenerator {

	initialState: Object;

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

		let flipXInput = CardHelper.genCheckbox("fxInput", obj.flipX, "Flip X");
		let flipYInput = CardHelper.genCheckbox("fyInput", obj.flipY, "Flip Y");

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
		contentCard.append(flipXInput);
		contentCard.append(flipYInput);
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
		$("#fxInput").change(this.setValues.bind(this));
		$("#fyInput").change(this.setValues.bind(this));

		this.initialState = obj.clone();
	}

	setValues(): void {
		let currentItem = SelectHandler.getSelection();

		let x = parseFloat($("#xInput").val() as string);
		let y = parseFloat($("#yInput").val() as string);
		let z = parseFloat($("#zInput").val() as string);
		let xScale = parseFloat($("#xSInput").val() as string);
		let yScale = parseFloat($("#ySInput").val() as string);
		let rotation = parseFloat($("#zRInput").val() as string);
		let flipX = $("#fxInput").is(":checked");
		let flipY = $("#fyInput").is(":checked");

		if (this._isDefined(x))
			currentItem.x = x;
		if (this._isDefined(y))
			currentItem.y = y;
		if (this._isDefined(z))
			currentItem.z = z;
		if (this._isDefined(xScale))
			currentItem.xScale = xScale;
		if (this._isDefined(yScale))
			currentItem.yScale = yScale;
		if (this._isDefined(rotation))
			currentItem.rotation = rotation;

		currentItem.flipX = flipX;
		currentItem.flipY = flipY;

		ActionHandler.add(new ChangeAction(this.initialState, currentItem));
		this.initialState = currentItem.clone();
	}

	_isDefined(v: any) {
		return v !== null && v !== undefined && Number.isFinite(v);
	}

	updateValues(obj: Object): void {
		$("#xInput").val(obj.x);
		$("#yInput").val(obj.y);
	}
}