import { CardHelper } from "./CardHelper.js";
import { ColliderGenerator } from "./ColliderGenerator.js";
import { TransformGenerator } from "./TransformGenerator.js";
export class CardHandler {
    constructor() {
        this.transformGen = new TransformGenerator();
        this.colliderGen = new ColliderGenerator();
    }
    load(obj) {
        this.clear();
        // Cards
        this.transformGen.generate(obj);
        this.colliderGen.generate(obj);
        // Bottom Buttons
        let colliderButton = CardHelper.genBottomButton("Add Collider");
        colliderButton.onclick = obj.addCollider.bind(obj);
        CardHelper.append(colliderButton);
    }
    clear() {
        $("#prop-name").empty();
        $("#prop-list").empty();
        $("#trash").prop("disabled", true);
    }
}
//# sourceMappingURL=CardHandler.js.map