import { ItemDB } from '../map/ItemDB.js';
import { MapHandler } from '../map/MapHandler.js';
export class UIHandler {
    constructor() {
        this.initItemDB();
        $("body").addClass("no-overflow");
        $("#left-btn").click(this.toggleLeftPanel);
        $("#right-btn").click(this.toggleRightPanel);
        $("#map-name").click(this.renameMap);
        $("#map-name-input").focusout(this.setMapName);
        $("#trash").click((() => {
            MapHandler.delete(this.currentItem);
            this.clearItemProperties();
            this.deletedSelection = true;
        }).bind(this));
        this.deletedSelection = false;
    }
    /*    Map Title    */
    renameMap() {
        $("#map-name").hide();
        $("#map-name-input").show();
        $("#map-name-input").select();
    }
    setMapName() {
        $("#map-name-input").hide();
        $("#map-name").show();
        let name = $("#map-name-input").val();
        MapHandler.map.name = name;
        $("#map-name").text(name);
    }
    /*    Left & Right Panels    */
    toggleLeftPanel() {
        if ($("#left-panel").hasClass("close-left")) {
            $("#left-panel").removeClass("close-left");
            $("#left-btn").removeClass("close-left-btn");
        }
        else {
            $("#left-panel").addClass("close-left");
            $("#left-btn").addClass("close-left-btn");
        }
    }
    toggleRightPanel() {
        if ($("#right-panel").hasClass("close-right")) {
            $("#right-panel").removeClass("close-right");
            $("#right-btn").removeClass("close-right-btn");
        }
        else {
            $("#right-panel").addClass("close-right");
            $("#right-btn").addClass("close-right-btn");
        }
    }
    /*    Item Database    */
    initItemDB() {
        for (let typeID in ItemDB) {
            let dropdownOption = document.createElement("option");
            dropdownOption.value = typeID;
            dropdownOption.text = typeID;
            $("#item-dropdown").append(dropdownOption);
        }
        $("#item-dropdown").change(this.loadItemCategory);
        this.loadItemCategory();
    }
    /*    Property Panels    */
    loadItemCategory() {
        let value = $("#item-dropdown").val();
        $("#item-list").empty();
        for (let itemID in ItemDB[value]) {
            let name = ItemDB[value][itemID];
            let itemImg = document.createElement("img");
            itemImg.src = "/Sprites/" + itemID + ".png";
            let itemOption = document.createElement("button");
            itemOption.append(itemImg);
            itemOption.innerHTML += name;
            itemOption.classList.add("list-group-item");
            itemOption.classList.add("list-group-item-action");
            itemOption.type = "button";
            itemOption.onclick = () => {
                MapHandler.addExisting(name, itemID);
            };
            $("#item-list").append(itemOption);
        }
    }
    loadItemProperties(item) {
        this.currentItem = item;
        // Property Divs
        let titleCard = document.createElement("div");
        titleCard.classList.add("list-group-item");
        titleCard.classList.add("bigger");
        let itemImg = document.createElement("img");
        itemImg.src = item.sprite.data;
        itemImg.classList.add("item-img");
        titleCard.append(itemImg);
        titleCard.innerHTML += item.name;
        let dataCard = document.createElement("div");
        dataCard.classList.add("list-group-item");
        // Panel
        let panel = document.createElement("div");
        let label1 = document.createElement("p");
        let label2 = document.createElement("p");
        let label3 = document.createElement("p");
        panel.classList.add("prop-side");
        label1.innerText = "Position";
        label2.innerText = "Scale";
        label3.innerText = "Rotation";
        // Inputs
        let makeInput = ((id, val) => {
            let input = document.createElement("input");
            input.type = "number";
            input.id = id;
            input.setAttribute("value", val.toString());
            input.step = "any";
            return input;
        }).bind(this);
        let xInput = makeInput("xInput", item.x);
        let yInput = makeInput("yInput", item.y);
        let zInput = makeInput("zInput", item.z);
        let xSInput = makeInput("xSInput", item.xScale);
        let ySInput = makeInput("ySInput", item.yScale);
        let zRInput = makeInput("zRInput", item.rotation);
        // Apply
        panel.append(label1);
        panel.innerHTML += "X";
        panel.append(xInput);
        panel.innerHTML += "Y";
        panel.append(yInput);
        panel.innerHTML += "Z";
        panel.append(zInput);
        panel.append(document.createElement("br"));
        panel.append(label2);
        panel.innerHTML += "X";
        panel.append(xSInput);
        panel.innerHTML += "Y";
        panel.append(ySInput);
        panel.append(document.createElement("br"));
        panel.append(label3);
        panel.innerHTML += "Z";
        panel.append(zRInput);
        dataCard.append(panel);
        // Output
        $("#prop-name").empty();
        $("#prop-name").append(titleCard);
        $("#prop-name").append(dataCard);
        // On Change
        $("#xInput").change(this.setItemProperties.bind(this));
        $("#yInput").change(this.setItemProperties.bind(this));
        $("#zInput").change(this.setItemProperties.bind(this));
        $("#xSInput").change(this.setItemProperties.bind(this));
        $("#ySInput").change(this.setItemProperties.bind(this));
        $("#zRInput").change(this.setItemProperties.bind(this));
        // Header
        $("#trash").prop("disabled", false);
    }
    updateItemProperties(item) {
        $("#xInput").val(item.x);
        $("#yInput").val(item.y);
    }
    clearItemProperties() {
        this.currentItem = undefined;
        $("#prop-name").empty();
        $("#prop-list").empty();
        $("#trash").prop("disabled", true);
    }
    setItemProperties() {
        //console.log("Before");
        //console.log(this.currentItem);
        this.currentItem.x = parseFloat($("#xInput").val());
        this.currentItem.y = parseFloat($("#yInput").val());
        this.currentItem.z = parseFloat($("#zInput").val());
        this.currentItem.xScale = parseFloat($("#xSInput").val());
        this.currentItem.yScale = parseFloat($("#ySInput").val());
        this.currentItem.rotation = parseFloat($("#zRInput").val());
        //console.log("After");
        //console.log(this.currentItem);
    }
}
//# sourceMappingURL=UIHandler.js.map