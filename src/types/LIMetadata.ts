import GUID from "./GUID";

export default interface LIMetadata {
    id: GUID;
    name: string;
    description: string;
    authorID: string;
    authorName: string;
    isPublic: boolean;
    isVerified: boolean;
    createdAt: number;

    likeCount?: number;
    removalReason?: string;
    thumbnailURL?: string;
}