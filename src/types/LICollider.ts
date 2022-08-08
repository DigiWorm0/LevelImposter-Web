import GUID from "./GUID";
import Point from "./Point";

export default interface LICollider {
    id: GUID;
    blocksLight: boolean;
    isSolid: boolean;
    points: Point[];
}