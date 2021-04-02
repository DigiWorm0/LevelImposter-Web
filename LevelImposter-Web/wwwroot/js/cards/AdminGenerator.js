import { MapHandler } from "../map/MapHandler.js";
import { CardHelper } from "./CardHelper.js";
export class AdminGenerator {
    generate(obj) {
        if (obj.type != "util-admin")
            return;
        // Base
        let baseCard = CardHelper.genBase();
        let titleCard = CardHelper.genTitle("Admin Table");
        let contentCard = CardHelper.genContent();
        // Labels
        for (let i = 0; i < MapHandler.map.objs.length; i++) {
            let obj2 = MapHandler.map.objs[i];
            if (obj2.type == "util-room") {
                let label = CardHelper.genP(obj2.name);
                label.style.marginBottom = "0";
                if (obj2.colliders.length <= 0)
                    label.style.fontStyle = "italic";
                contentCard.appendChild(document.createElement("br"));
                contentCard.appendChild(label);
            }
        }
        // Children
        baseCard.appendChild(titleCard);
        baseCard.appendChild(contentCard);
        CardHelper.append(baseCard);
    }
}
//# sourceMappingURL=AdminGenerator.js.map