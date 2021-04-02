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
			let checkbox = CardHelper.genCheckbox("collider" + index + "-checkbox", collider.blocksLight, "Vision Block");
			(checkbox.firstChild as HTMLInputElement).onchange = (() => {
				collider.blocksLight = (document.getElementById("collider" + index + "-checkbox") as HTMLInputElement).checked;
			}).bind(this);
			contentCard.appendChild(checkbox);
		}

		// Edit
		let editBtn = CardHelper.genButton("Edit", "primary");
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