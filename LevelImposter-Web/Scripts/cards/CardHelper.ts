export class CardHelper {
	static genBase() {
		let baseCard = document.createElement("div");

		baseCard.classList.add("li-card");

		return baseCard;
	}

	static genTitle(title: string): HTMLDivElement {
		let titleCard = document.createElement("div");

		titleCard.classList.add("list-group-item");
		titleCard.classList.add("bigger");
		titleCard.innerText = title;

		return titleCard;
	}

	static genContent(): HTMLDivElement {
		let contentCard = document.createElement("div");

		contentCard.classList.add("list-group-item");

		return contentCard;
	}

	static genCheckboxWrapper(): HTMLDivElement {
		let checkboxWrapper = document.createElement("div");

		checkboxWrapper.classList.add("form-check");
		checkboxWrapper.classList.add("mb-1");

		return checkboxWrapper;
	}

	static genLabel(title: string, id: string): HTMLLabelElement {
		let label = document.createElement("label");

		label.classList.add("form-check-label");
		label.setAttribute("for", id);
		label.innerText = title;

		return label;
	}

	static genCheckbox(id: string, checked: boolean, title: string): HTMLDivElement {
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

	static genButton(name: string, type: string): HTMLButtonElement {
		let btn = document.createElement("button");

		btn.classList.add("btn");
		btn.classList.add("btn-" + type);
		btn.type = "button";
		btn.innerText = name;
		btn.classList.add("m-1");

		return btn;
	}

	static genImg(src: string): HTMLImageElement {
		let img = document.createElement("img");

		img.src = src;
		img.classList.add("item-img");

		return img;
	}

	static genP(title: string): HTMLParagraphElement {
		let p = document.createElement("p");

		p.innerText = title;

		return p;
	}

	static genNumInput(id: string, val: number): HTMLInputElement {
		let input = document.createElement("input");

		input.type = "number";
		input.id = id;
		input.setAttribute("value", val.toString());
		input.step = "any";

		return input;
	}

	static genTxtInput(id: string, val: string): HTMLInputElement {
		let input = document.createElement("input");

		input.type = "text";
		input.id = id;
		input.setAttribute("value", val);

		return input;
	}

	static genBottomButton(name: string): HTMLButtonElement {
		let btn = document.createElement("button");

		btn.classList.add("btn");
		btn.classList.add("btn-light");
		btn.classList.add("mb-2");
		btn.classList.add("mr-1");
		btn.type = "button";
		btn.innerText = name;

		return btn;
	}

	static genDropdown(names: string[], values: string[], selected: string, id: string): HTMLSelectElement {
		let select = document.createElement("select");
		
		select.id = id;
		for (let i = 0; i < Math.min(names.length, values.length); i++) {
			let option = document.createElement("option");

			option.text = names[i];
			option.value = values[i];
			if (values[i] == selected)
				option.selected = true;

			select.appendChild(option);
		}

		return select;
	}

	static append(div: HTMLElement): void {
		$("#prop-list").append(div);
	}
}