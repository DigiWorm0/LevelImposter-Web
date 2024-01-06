import {
    collection,
    DocumentData,
    DocumentSnapshot,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    where
} from "firebase/firestore";
import React from "react";
import LIMetadata, { MaybeLIMetadata } from "../types/LIMetadata";
import { db } from "./utils/Firebase";
import useUser from "./useUser";
import MapFilter, { MAP_FILTER_CONSTRAINTS } from "../types/MapFilter";
import useMapSearch from "./useMapSearch";
import LIMapList from "../types/LIMapList";

const MAX_PER_PAGE = 3 * 30;

export function _useMaps(constraints: QueryConstraint[]): LIMapList {
    const [error, setError] = React.useState<any>(undefined);
    const [mapList, setMapList] = React.useState<MaybeLIMetadata[]>([]);
    const [lastDoc, setLastDoc] = React.useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        // Add filler
        setMapList(Array(MAX_PER_PAGE).fill(undefined));

        // Create query
        const storeRef = collection(db, "maps");
        const mapsQuery = query(storeRef, ...constraints, limit(MAX_PER_PAGE));

        // Get maps
        getDocs(mapsQuery).then(maps => {
            setError(undefined);
            setMapList(maps.docs.map(doc => doc.data() as LIMetadata));
            setLastDoc(maps.docs[maps.docs.length - 1]);
            setHasMore(maps.docs.length === MAX_PER_PAGE);
        }).catch((err: any) => {
            console.error(err);
            setError(err);
            setMapList([]);
            setLastDoc(undefined);
            setHasMore(false);
        });
    }, [constraints]);

    const loadMore = React.useCallback(() => {
        if (!lastDoc) return;

        // Add filler
        const defaultMapList = mapList ?? [];
        setMapList([...defaultMapList, ...Array(MAX_PER_PAGE).fill(undefined)]);

        // Create query
        const storeRef = collection(db, "maps");
        const mapsQuery = query(storeRef, ...constraints, startAfter(lastDoc), limit(MAX_PER_PAGE));

        // Get maps
        getDocs(mapsQuery).then(maps => {
            const liMaps = maps.docs.map(doc => doc.data() as LIMetadata);
            setMapList(defaultMapList.concat(liMaps));
            setLastDoc(maps.docs[maps.docs.length - 1]);
            setHasMore(maps.docs.length === MAX_PER_PAGE);
        }).catch((err: any) => {
            console.error(err);
            setError(err);
            setMapList(defaultMapList);
        });
    }, [lastDoc, mapList, constraints]);

    return {
        maps: mapList,
        error,
        loadMore,
        hasMore,
    };
}

export default function useMaps(filter?: MapFilter, query?: string) {
    const constraints = MAP_FILTER_CONSTRAINTS[filter ?? MapFilter.Featured]
    const allMaps = _useMaps(constraints);
    const searchedMaps = useMapSearch(query);

    return query && query !== "" ? searchedMaps : allMaps;
}

export function useUserMaps(userID?: string) {
    const user = useUser();

    // Build constraints
    const constraints = React.useMemo(() => {
        if (!user || !userID) return [];

        const mapQueries = [];
        if (!user?.isAdmin && userID !== user?.uid)
            mapQueries.push(where("isPublic", "==", true));
        mapQueries.push(where("authorID", "==", userID));
        mapQueries.push(orderBy("createdAt", "desc"));
        return mapQueries;
    }, [userID, user]);
    
    return _useMaps(constraints);
}