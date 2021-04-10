import { AdminGenerator } from "./AdminGenerator.js";
import { CardHelper } from "./CardHelper.js";
import { ColliderGenerator } from "./ColliderGenerator.js";
import { RoomGenerator } from "./RoomGenerator.js";
import { SabGenerator } from "./SabGenerator.js";
import { TaskGenerator } from "./TaskGenerator.js";
import { TransformGenerator } from "./TransformGenerator.js";
import { VentGenerator } from "./VentGenerator.js";
export class CardHandler {
    constructor() {
        this.transformGen = new TransformGenerator();
        this.colliderGen = new ColliderGenerator();
        this.roomGen = new RoomGenerator();
        this.adminGen = new AdminGenerator();
        this.sabGen = new SabGenerator();
        this.taskGen = new TaskGenerator();
        this.ventGen = new VentGenerator();
    }
    load(obj) {
        this.clear();
        // Cards
        this.transformGen.generate(obj);
        this.roomGen.generate(obj);
        this.adminGen.generate(obj);
        this.sabGen.generate(obj);
        this.taskGen.generate(obj);
        this.colliderGen.generate(obj);
        this.ventGen.generate(obj);
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