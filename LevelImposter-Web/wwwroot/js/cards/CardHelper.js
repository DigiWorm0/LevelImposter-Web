export class CardHelper {
    static genBase() {
        let baseCard = document.createElement("div");
        baseCard.classList.add("li-card");
        return baseCard;
    }
    static genTitle(title) {
        let titleCard = document.createElement("div");
        titleCard.classList.add("list-group-item");
        titleCard.classList.add("bigger");
        titleCard.innerText = title;
        return titleCard;
    }
    static genContent() {
        let contentCard = document.createElement("div");
        contentCard.classList.add("list-group-item");
        return contentCard;
    }
    static genCheckboxWrapper() {
        let checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("form-check");
        checkboxWrapper.classList.add("mb-1");
        return checkboxWrapper;
    }
    static genLabel(title, id) {
        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for", id);
        label.innerText = title;
        return label;
    }
    static genCheckbox(id, checked, title) {
        let wrapper = CardHelper.genCheckboxWrapper();
        let label = CardHelper.genLabel(title, id);
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = id;
        checkbox.id = id;
        checkbox.classList.add("form-check-input");
        checkbox.checked = checked;
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        return wrapper;
    }
    static genButton(name, type) {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-" + type);
        btn.type = "button";
        btn.innerText = name;
        btn.classList.add("m-1");
        return btn;
    }
    static genImg(src) {
        let img = document.createElement("img");
        img.src = src;
        img.classList.add("item-img");
        return img;
    }
    static genP(title) {
        let p = document.createElement("p");
        p.innerText = title;
        return p;
    }
    static genNumInput(id, val) {
        let input = document.createElement("input");
        input.type = "number";
        input.id = id;
        input.setAttribute("value", val.toString());
        input.step = "any";
        return input;
    }
    static genBottomButton(name) {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-light");
        btn.classList.add("mb-2");
        btn.classList.add("mr-1");
        btn.type = "button";
        btn.innerText = name;
        return btn;
    }
    static append(div) {
        $("#prop-list").append(div);
    }
}
//# sourceMappingURL=CardHelper.js.map