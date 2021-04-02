import { InputHandler } from '../input/InputHandler.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { ColliderEditor } from '../map/ColliderEditor.js';
import { CardHelper } from './CardHelper.js';
export class ColliderGenerator {
    generateCollider(collider, index, parent) {
        // Base
        let baseCard = CardHelper.genBase();
        let titleCard = CardHelper.genTitle("Collider " + (index + 1));
        let contentCard = CardHelper.genContent();
        // Checkbox
        if (parent.data != "util-room") {
            let checkbox = CardHelper.genCheckbox("collider" + index + "-checkbox", collider.blocksLight, "Vision Block");
            checkbox.firstChild.onchange = (() => {
                collider.blocksLight = document.getElementById("collider" + index + "-checkbox").checked;
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
    generate(obj) {
        obj.colliders.forEach((val, index) => {
            this.generateCollider(val, index, obj);
        });
    }
}
//# sourceMappingURL=ColliderGenerator.js.map