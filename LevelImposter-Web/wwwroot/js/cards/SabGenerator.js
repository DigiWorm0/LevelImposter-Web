import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { ChangeAction } from "../input/Actions/ChangeAction.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { CardHelper } from "./CardHelper.js";
export class SabGenerator {
    generate(obj) {
        if (!obj.type.startsWith("sab-"))
            return;
        // Base
        let baseCard = CardHelper.genBase();
        let titleCard = CardHelper.genTitle("Sabotage Info");
        let contentCard = CardHelper.genContent();
        contentCard.classList.add("specialdata");
        // Inputs
        let names = ["Default Room"];
        let values = ["-1"];
        if (obj.targetIds.length <= 0)
            obj.targetIds = [-1];
        let target = obj.targetIds[0];
        for (let i = 0; i < MapHandler.map.objs.length; i++) {
            let obj2 = MapHandler.map.objs[i];
            if (obj2.type == "util-room") {
                names.push(obj2.name);
                values.push(obj2.id.toString());
            }
        }
        let roomInput = CardHelper.genDropdown(names, values, target.toString(), "roomInput");
        // Labels
        let nameLabel = CardHelper.genP("Room");
        let descLabel = CardHelper.genP("Sabotages need a room to link to in order to display on the sabotage map.");
        descLabel.style.width = "100%";
        descLabel.style.margin = "2px";
        descLabel.style.textAlign = "center";
        // Children
        contentCard.append(nameLabel);
        contentCard.append(roomInput);
        contentCard.append(descLabel);
        baseCard.appendChild(titleCard);
        baseCard.appendChild(contentCard);
        CardHelper.append(baseCard);
        // On Change
        $("#roomInput").change(this.setValues.bind(this));
        this.initialState = obj.clone();
    }
    setValues() {
        let currentItem = SelectHandler.getSelection();
        let id = $("#roomInput").val();
        currentItem.targetIds = [
            parseInt(id)
        ];
        ActionHandler.add(new ChangeAction(this.initialState, currentItem));
        this.initialState = currentItem.clone();
    }
}
//# sourceMappingURL=SabGenerator.js.map