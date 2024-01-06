import { MaybeLIMetadata } from "./LIMetadata";

export default interface LIMapList {
    maps: MaybeLIMetadata[];
    error?: any;
    loadMore: () => void;
    hasMore: boolean;
}