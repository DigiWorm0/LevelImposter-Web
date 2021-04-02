import { Object } from "../models/Object.js";

export interface CardGenerator {
	generate(obj: Object): void;
}