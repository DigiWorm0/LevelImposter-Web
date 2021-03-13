import { InputHandler } from '../input/InputHandler.js';
import { ColliderEditor } from '../map/ColliderEditor.js';
export class ColliderGenerator {
    constructor(_currentItem) {
        this.currentItem = _currentItem;
    }
    generateColliderCard(collider, index) {
        // Card
        let colliderCard = document.createElement("div");
        colliderCard.classList.add("collider-prop");
        // Title
        let colliderTitle = document.createElement("div");
        colliderTitle.classList.add("list-group-item");
        colliderTitle.classList.add("bigger");
        colliderTitle.innerText = "Collider " + (index + 1);
        // Content
        let colliderContent = document.createElement("div");
        colliderContent.classList.add("list-group-item");
        // Checkbox Wrapper
        let checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("form-check");
        checkboxDiv.classList.add("mb-1");
        // Checkbox
        let colliderCheckbox = document.createElement("input");
        colliderCheckbox.type = "checkbox";
        colliderCheckbox.name = "collider" + index + "-checkbox";
        colliderCheckbox.id = "collider" + index + "-checkbox";
        colliderCheckbox.classList.add("form-check-input");
        colliderCheckbox.checked = collider.blocksLight;
        colliderCheckbox.onchange = (() => {
            collider.blocksLight = document.getElementById("collider" + index + "-checkbox").checked;
        }).bind(this);
        // Checkbox Label
        let checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.setAttribute("for", "collider" + index + "-checkbox");
        checkboxLabel.innerText = "Vision Block";
        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.classList.add("btn");
        editBtn.classList.add("btn-primary");
        editBtn.type = "button";
        editBtn.innerText = "Edit";
        editBtn.classList.add("m-1");
        editBtn.onclick = ((() => {
            ColliderEditor.edit(this.currentItem, index);
        }).bind(this));
        // Delete Button
        let delBtn = document.createElement("button");
        delBtn.classList.add("btn");
        delBtn.classList.add("btn-danger");
        delBtn.type = "button";
        delBtn.innerText = "Delete";
        delBtn.classList.add("m-1");
        delBtn.onclick = ((() => {
            this.currentItem.remCollider(index);
            InputHandler.ui.props.load(this.currentItem);
        }).bind(this));
        // Append
        checkboxDiv.appendChild(colliderCheckbox);
        checkboxDiv.appendChild(checkboxLabel);
        colliderContent.appendChild(checkboxDiv);
        colliderContent.appendChild(editBtn);
        colliderContent.appendChild(delBtn);
        colliderCard.appendChild(colliderTitle);
        colliderCard.appendChild(colliderContent);
        $("#prop-list").append(colliderCard);
    }
}
//# sourceMappingURL=ColliderGenerator.js.map