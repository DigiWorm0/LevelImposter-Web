import { CardHelper } from './CardHelper.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { ActionHandler } from '../input/Actions/ActionHandler.js';
import { ChangeAction } from '../input/Actions/ChangeAction.js';
export class TransformGenerator {
    generate(obj) {
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
    setValues() {
        let currentItem = SelectHandler.getSelection();
        currentItem.x = parseFloat($("#xInput").val());
        currentItem.y = parseFloat($("#yInput").val());
        currentItem.z = parseFloat($("#zInput").val());
        currentItem.xScale = parseFloat($("#xSInput").val());
        currentItem.yScale = parseFloat($("#ySInput").val());
        currentItem.rotation = parseFloat($("#zRInput").val());
        currentItem.flipX = $("#fxInput").is(":checked");
        currentItem.flipY = $("#fyInput").is(":checked");
        ActionHandler.add(new ChangeAction(this.initialState, currentItem));
        this.initialState = currentItem.clone();
    }
    updateValues(obj) {
        $("#xInput").val(obj.x);
        $("#yInput").val(obj.y);
    }
}
//# sourceMappingURL=TransformGenerator.js.map