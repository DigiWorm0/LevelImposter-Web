import { orderBy, QueryConstraint, where } from "firebase/firestore";

enum MapFilter {
    Featured = "Featured",
    MostLiked = "Most Liked",
    MostDownloaded = "Most Downloaded",
    Recent = "Recent",
    Private = "Private",
}

export default MapFilter;

export const MAP_FILTER_CONSTRAINTS: Record<MapFilter, QueryConstraint[]> = {
    [MapFilter.Featured]: [
        where("isPublic", "==", true),
        where("isVerified", "==", true),
        orderBy("createdAt", "desc"),
    ],
    [MapFilter.MostLiked]: [
        where("isPublic", "==", true),
        orderBy("likeCount", "desc"),
        orderBy("createdAt", "desc"),
    ],
    [MapFilter.MostDownloaded]: [
        where("isPublic", "==", true),
        orderBy("downloadCount", "desc"),
        orderBy("createdAt", "desc"),
    ],
    [MapFilter.Recent]: [
        where("isPublic", "==", true),
        orderBy("createdAt", "desc"),
    ],
    [MapFilter.Private]: [
        where("isPublic", "==", false),
        orderBy("createdAt", "desc"),
    ],
}