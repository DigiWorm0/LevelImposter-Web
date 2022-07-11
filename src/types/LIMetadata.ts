import GUID from "./GUID";

export default interface LIMetadata {
    id: GUID;
    name: string;
    description: string;
    authorID: string;
    storageURL: string;
}