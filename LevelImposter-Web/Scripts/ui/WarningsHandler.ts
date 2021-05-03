import { MapHandler } from "../map/MapHandler.js";

export class WarningsHandler {

	hasAdded: boolean;

	constructor() {
		setInterval(this.update.bind(this), 3000);
	}

	update(): void {
		this.clear();
		this.hasAdded = false;

		// Search Map
		let objCount = {};
		let noColliderRooms = [];
		for (var i = 0; i < MapHandler.map.objs.length; i++) {
			let obj = MapHandler.map.objs[i];
			if (obj.type in objCount)
				objCount[obj.type]++;
			else
				objCount[obj.type] = 1;
			if (obj.type == "util-room" && obj.colliders.length <= 0)
				noColliderRooms.push(obj.name);
		}
		function get(type: string): number {
			return type in objCount ? objCount[type] : 0;
		}

		// Breakers
		let breakersCount = get("task-breakers");
		if (breakersCount > 0 && breakersCount < 7) {
			this.add("Not Enough Breakers", "You must have exactly 7 breakers to use the breaker task");
		}
		else if (breakersCount > 7) {
			this.add("Too Many Breakers", "You must have exactly 7 breakers to use the breaker task");
		}

		// Toilets
		let toiletCount = get("task-toilet");
		if (toiletCount > 0 && toiletCount < 4) {
			this.add("Not Enough Toilets", "You must have exactly 4 toilets to use the toilet task");
		}
		else if (toiletCount > 4) {
			this.add("Too Many Toilets", "You must have exactly 4 toilets to use the toilet task");
		}

		// Weather Nodes
		let nodeCount = get("task-node");
		let hasNodeSwitch = get("task-nodeswitch") > 0;
		if (nodeCount > 0 && nodeCount < 5) {
			this.add("Not Enough Weather Nodes", "You must have exactly 5 nodes and a node switch to use the weather nodes task");
		}
		else if (nodeCount > 5) {
			this.add("Too Many Weather Nodes", "You must have exactly 5 nodes and a node switch to use the weather nodes task");
		}
		if (nodeCount > 0 && !hasNodeSwitch) {
			this.add("Missing Node Switch", "You must add a node switch to use the weather nodes task");
		}
		else if (nodeCount == 0 && hasNodeSwitch) {
			this.add("Missing Weather Nodes", "You must add 5 weather nodes to use the weather nodes task");
		}

		// Towels
		let towelCount = get("task-towels2") + get("task-towels3") + get("task-towels4") + get("task-towels5");
		let hasTowelBasket = get("task-towels1") > 0;
		if (towelCount > 0 && towelCount < 14) {
			this.add("Not Enough Towels", "You must have exactly 14 towels and a towel basket to use the towel task");
		}
		else if (towelCount > 14) {
			this.add("Too Many Towles", "You must have exactly 14 towels and a towel basket to use the towel task");
		}
		if (towelCount > 0 && !hasTowelBasket) {
			this.add("Missing Towel Basket", "You must add a towel basket to use the towels task");
		}
		else if (towelCount == 0 && hasTowelBasket) {
			this.add("Missing Towels", "You must add 14 towels to use the towels task");
		}

		// Records
		let shelfCount = get("task-records2");
		let hasFolder = get("task-records1") > 0;
		if (shelfCount > 0 && shelfCount < 8) {
			this.add("Not Enough Shelves", "You must have exactly 8 shelves and a folder to use the records task");
		}
		else if (shelfCount > 8) {
			this.add("Too Many Shelves", "You must have exactly 8 shelves and a folder to use the records task");
		}
		if (shelfCount > 0 && !hasFolder) {
			this.add("Missing Records Folder", "You must add a records folder to use the records task");
		}
		else if (shelfCount == 0 && hasFolder) {
			this.add("Missing Record Shelves", "You must add 8 record shelves to use the records task");
		}

		// Gas
		let hasGas = get("task-fuel1") > 0;
		let hasInputA = get("task-fuel2") > 0;
		let hasInputB = get("task-fuel3") > 0;
		if (hasGas && !hasInputA) {
			this.add("Missing Gas Output 1", "You must add a gas output 1 and gas output 2 to use the gas task");
		}
		if (hasGas && !hasInputB) {
			this.add("Missing Gas Output 2", "You must add a gas output 1 and gas output 2 to use the gas task");
		}
		if ((hasInputA || hasInputB) && !hasGas) {
			this.add("Missing Gas Canister", "You must add a gas canister to use the gas task");
		}

		// Water Wheel
		let hasWheelA = get("task-waterwheel1") > 0;
		let hasWheelB = get("task-waterwheel2") > 0;
		let hasWheelC = get("task-waterwheel3") > 0;
		if (hasWheelA && !hasWheelB) {
			this.add("Missing Water Wheel 2", "You must add water wheels 1, 2, and 3 to use the water wheel task");
		}
		if (hasWheelA && !hasWheelC) {
			this.add("Missing Water Wheel 3", "You must add water wheels 1, 2, and 3 to use the water wheel task");
		}
		if ((hasWheelB || hasWheelC) && !hasWheelA) {
			this.add("Missing Water Wheel 1", "You must add water wheels 1, 2, and 3 to use the water wheel task");
		}

		// Water Jug
		let hasJugA = get("task-waterjug1") > 0;
		let hasJugB = get("task-waterjug2") > 0;
		if (hasJugA && !hasJugB) {
			this.add("Missing Water Jug 2", "You must add water jugs 1 and 2 to use the water jugs task");
		}
		else if (!hasJugA && hasJugB) {
			this.add("Missing Water Jug 1", "You must add water jugs 1 and 2 to use the water jugs task");
		}

		// Reactor
		let hasReactorA = get("sab-reactorleft") > 0;
		let hasReactorB = get("sab-reactorright") > 0;
		if (hasReactorA && !hasReactorB) {
			this.add("Missing Right Reactor", "You must add the left and right reactors to use the reactor sabotage");
		}
		else if (!hasReactorA && hasReactorB) {
			this.add("Missing Left Reactor", "You must add the left and right reactors to use the reactor sabotage");
		}

		// Align Engine
		let hasAlign1 = get("task-align1") > 0;
		let hasAlign2 = get("task-align2") > 0;
		if (hasAlign1 && !hasAlign2) {
			this.add("Missing Align Engine 2", "You must add align engines 1 and 2 to use the align engines task");
		}
		else if (!hasAlign1 && hasAlign2) {
			this.add("Missing Align Engine 1", "You must add align engines 1 and 2 to use the align engines task");
		}

		// Water Plants
		let hasCan = get("task-plants1") > 0;
		let hasPlants = get("task-plants2") > 0;
		if (hasCan && !hasPlants) {
			this.add("Missing Water Plants", "You must add water can and water plants to use the water plants task");
		}
		else if (!hasCan && hasPlants) {
			this.add("Missing Water Can", "You must add water can and water plants to use the water plants task");
		}

		// Divert Power
		let hasDivert = get("task-divert1") > 0;
		let divertCount = get("task-divert2");
		if (hasDivert && divertCount == 0) {
			this.add("Missing Divert Power 2", "You must add divert power 1 and 2 to use the divert power task");
		}
		else if (divertCount > 0 && !hasDivert) {
			this.add("Missing Divert Power 1", "You must add divert power 1 and 2 to use the divert power task");
		}
		if (divertCount > 8) {
			this.add("Max Divert Powers Exceeded", "There is a maximum of 8 divert power locations");
		}

		// Divert Power
		let hasTrashA = get("task-garbage2") + get("task-garbage3") + get("task-garbage4") > 0;
		let hasTrashB = get("task-garbage5") > 0;
		if (hasTrashA && !hasTrashB) {
			this.add("Missing Trash Part 2", "You must add a trash part 2 in order to use the Airship's trash task");
		}
		else if (!hasTrashA && hasTrashB) {
			this.add("Missing Blue/Grey/Green Trash", "You must add a blue, green, or grey trash can in order to use the Airship's trash task");
		}

		// Start Fans
		let hasFansA = get("task-fans1") > 0;
		let hasFansB = get("task-fans2") > 0;
		if (hasFansA && !hasFansB) {
			this.add("Missing Start Fans 2", "You must add start fans 1 and 2 in order to use the start fans task");
		}
		else if (!hasFansA && hasFansB) {
			this.add("Missing Start Fans 1", "You must add start fans 1 and 2 in order to use the start fans task");
		}

		// Pistols
		let hasPistolsA = get("task-pistols1") > 0;
		let hasPistolsB = get("task-pistols2") > 0;
		if (hasPistolsA && !hasPistolsB) {
			this.add("Missing Pistols 2", "You must add a pistols 1 and 2 in order to use the store pistols task");
		}
		else if (!hasPistolsA && hasPistolsB) {
			this.add("Missing Pistols 1", "You must add a pistols 1 and 2 in order to use the store pistols task");
		}

		// Rifles
		let hasRiflesA = get("task-rifles1") > 0;
		let hasRiflesB = get("task-rifles2") > 0;
		if (hasRiflesA && !hasRiflesB) {
			this.add("Missing Rifles 2", "You must add a rifles 1 and 2 in order to use the store rifles task");
		}
		else if (!hasRiflesA && hasRiflesB) {
			this.add("Missing Rifles 1", "You must add a rifles 1 and 2 in order to use the store rifles task");
		}

		// Cams
		let hasCamera = get("util-cam") > 0;
		let hasCamPanel = get("util-cams") + get("util-cams2") + get("util-cams3") > 0;
		if (hasCamera && !hasCamPanel) {
			this.add("Missing Camera Panel", "You must add a camera panel in order to view your cameras");
		}
		else if (!hasCamera && hasCamPanel) {
			this.add("Missing Cameras", "You must add a camera in order to use the camera panel");
		}

		// Dummy
		let hasDummys = get("util-player") >= 2;
		if (!hasDummys && MapHandler.map.objs.length > 0) {
			this.add("Missing Dummies", "You must add atleast 2 dummies to use imposter in freeplay");
		}

		// Rooms
		for (let i = 0; i < noColliderRooms.length; i++) {
			this.add(noColliderRooms[i] + "'s Room Utility is Missing a Collider", "You must add a collider to all your room utilities for LevelImposter to know the room's size and shape");
		}

		// Admin Table
		let hasAdmin = get("util-admin") > 0;
		let hasRoom = get("util-room") > 0;
		if (hasAdmin && !hasRoom) {
			this.add("No Room Utilities", "Admin Table will not work without any room utilities");
		}

		// Spawns
		let spawnCountA = get("util-spawn1");
		let spawnCountB = get("util-spawn2");
		if (spawnCountA > 1 || spawnCountB > 1) {
			this.add("Too Many Spawn Points", "You can only have 1 of each type of spawn point. Players are spawned around the spawn point's circle");
		}

		// Finish
		if (!this.hasAdded) {
			this.hide();
		}
	}

	add(title: string, msg: string): void {
		document.getElementById("warnings").innerHTML += "<b>" + title + "</b><br/>" + msg + "<hr/>";
		this.hasAdded = true;
		this.show();
	}

	clear(): void {
		$("#warnings").text("");
	}

	show(): void {
		$("#warning-btn").show();
	}

	hide(): void {
		$("#warning-btn").hide();
		var warning = document.getElementById('warning');
		if (warning.classList.contains("show"))
			warning.classList.remove("show");
	}

}