import { SelectHandler } from "../input/SelectHandler.js";
import { CardHelper } from "./CardHelper.js";
export class RoomGenerator {
    generate(obj) {
        if (obj.data != "util-room")
            return;
        // Base
        let baseCard = CardHelper.genBase();
        let titleCard = CardHelper.genTitle("Room Info");
        let contentCard = CardHelper.genContent();
        contentCard.classList.add("specialdata");
        // Inputs
        let nameInput = CardHelper.genTxtInput("roomNameInput", obj.name);
        // Labels
        let nameLabel = CardHelper.genP("Name");
        let descLabel = CardHelper.genP("Rooms are used for admin table, map, and sabotages. Add a collider surrounding the room if you want the room to show up on admin table.");
        descLabel.style.width = "100%";
        descLabel.style.margin = "2px";
        descLabel.style.textAlign = "center";
        // Children
        contentCard.append(nameLabel);
        contentCard.append(nameInput);
        contentCard.append(descLabel);
        baseCard.appendChild(titleCard);
        baseCard.appendChild(contentCard);
        CardHelper.append(baseCard);
        // On Change
        $("#roomNameInput").change(this.setValues.bind(this));
    }
    setValues() {
        let currentItem = SelectHandler.getSelection();
        currentItem.name = $("#roomNameInput").val();
        $("#obj-title").text(currentItem.name);
    }
}
//# sourceMappingURL=RoomGenerator.js.map