import { InputHandler } from '../input/InputHandler.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { ColliderEditor } from '../map/ColliderEditor.js';
import { Collider } from '../models/Collider.js';
import { Object } from '../models/Object.js'
import { CardGenerator } from './CardGenerator.js';
import { CardHelper } from './CardHelper.js';

export class ColliderGenerator implements CardGenerator {

	generateCollider(collider: Collider, index: number, parent: Object): void {
		// Base
		let baseCard = CardHelper.genBase();
		let titleCard = CardHelper.genTitle("Collider " + (index + 1));
		let contentCard = CardHelper.genContent();

		// Checkbox
		if (parent.type != "util-room")
		{
			let checkbox1 = CardHelper.genCheckbox("collider" + index + "-checkbox1", collider.blocksLight, "Vision Block");
			(checkbox1.firstChild as HTMLInputElement).onchange = (() => {
				collider.blocksLight = (document.getElementById("collider" + index + "-checkbox1") as HTMLInputElement).checked;
			}).bind(this);

			let checkbox2 = CardHelper.genCheckbox("collider" + index + "-checkbox2", collider.isClosed, "Closed Loop");
			(checkbox2.firstChild as HTMLInputElement).onchange = (() => {
				collider.isClosed = (document.getElementById("collider" + index + "-checkbox2") as HTMLInputElement).checked;
			}).bind(this);

			contentCard.appendChild(checkbox1);
			contentCard.appendChild(checkbox2);
		}

		// Edit
		let editBtn = CardHelper.genButton("Edit", "primary");
		editBtn.id = "colliderBtn" + index;
		editBtn.onclick = ((() => {
			ColliderEditor.edit(SelectHandler.getSelection(), index);
		}).bind(this));

		// Delete
		let delBtn = CardHelper.genButton("Delete", "danger");
		delBtn.onclick = ((() => {
			let selection = SelectHandler.getSelection();
			selection.remCollider(index);
			InputHandler.ui.cards.load(selection);
		}).bind(this));

		// Append Children
		contentCard.appendChild(editBtn);
		contentCard.appendChild(delBtn);
		baseCard.appendChild(titleCard);
		baseCard.appendChild(contentCard);
		CardHelper.append(baseCard);
	}

	generate(obj: Object): void {
		obj.colliders.forEach((val, index) => {
			this.generateCollider(val, index, obj);
		});
	}
}