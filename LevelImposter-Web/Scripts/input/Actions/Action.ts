export interface Action {
	undo(): void;
	redo(): void;
};