import { collection, deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, limit, orderBy, query, QueryConstraint, setDoc, startAfter, startAt, where } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import LIMetadata from "../types/LIMetadata";
import { db, storage } from "./Firebase";
import useUser from "./useUser";

const MAX_PER_PAGE = 3 * 30;

export interface MapList {
    maps: LIMetadata[];
    loadMore: () => void;
    hasMore: boolean;
}

export function _useMaps(contraints: QueryConstraint[]): MapList {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);
    const [lastDoc, setLastDoc] = React.useState<DocumentSnapshot<DocumentData> | undefined>(undefined);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        const storeRef = collection(db, "maps");
        const mapsQuery = query(storeRef, ...contraints, limit(MAX_PER_PAGE));
        getDocs(mapsQuery).then(maps => {
            setMapList(maps.docs.map(doc => doc.data() as LIMetadata));
            setLastDoc(maps.docs[maps.docs.length - 1]);
            setHasMore(maps.docs.length === MAX_PER_PAGE);
        });
    }, [contraints]);

    const loadMore = React.useCallback(() => {
        if (!lastDoc) return;
        const storeRef = collection(db, "maps");
        const mapsQuery = query(storeRef, ...contraints, startAfter(lastDoc), limit(MAX_PER_PAGE));
        getDocs(mapsQuery).then(maps => {
            const liMaps = maps.docs.map(doc => doc.data() as LIMetadata);
            setMapList(mapList.concat(liMaps));
            setLastDoc(maps.docs[maps.docs.length - 1]);
            setHasMore(maps.docs.length === MAX_PER_PAGE);
        });
    }, [lastDoc, mapList, contraints]);

    return { maps: mapList, loadMore, hasMore };
}

export function useUserMaps(userID?: string) {
    const user = useUser();
    const contrains = React.useMemo(() => {
        const mapQueries = [];
        if (!user?.isAdmin && userID !== user?.uid)
            mapQueries.push(where("isPublic", "==", true));
        if (userID)
            mapQueries.push(where("authorID", "==", userID));
        mapQueries.push(orderBy("createdAt", "desc"));
        return mapQueries;
    }, [userID, user]);
    return _useMaps(contrains);
}

export function useVerifiedMaps() {
    const constaints = React.useMemo(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            where("isVerified", "==", true),
            orderBy("createdAt", "desc"),
        ];
        return mapQueries;
    }, []);
    return _useMaps(constaints);
}

export function useRecentMaps() {
    const constaints = React.useMemo(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            orderBy("createdAt", "desc"),
        ];
        return mapQueries;
    }, []);
    return _useMaps(constaints);
}

export function useTopMaps() {
    const constaints = React.useMemo(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            orderBy("likeCount", "desc"),
            orderBy("createdAt", "desc"),
        ];
        return mapQueries;
    }, []);
    return _useMaps(constaints);
}

export function usePrivateMaps() {
    const user = useUser();
    const constaints = React.useMemo(() => {
        const mapQueries = [
            where("isPublic", "==", user?.isAdmin != true),
            orderBy("createdAt", "desc"),
        ];
        return mapQueries;
    }, [user]);
    const maps = _useMaps(constaints);

    if (user?.isAdmin)
        return maps;
    else
        return { maps: [], loadMore: () => { }, hasMore: false };
}

export function useMap(mapID?: string) {
    const [map, setMap] = React.useState<LIMetadata | undefined | null>(undefined);

    React.useEffect(() => {
        if (!mapID) return setMap(null);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);
        getDoc(docRef).then(doc => {
            if (doc.exists())
                setMap(doc.data() as LIMetadata);
            else
                setMap(null);
        });
    }, [mapID]);

    return map;
}

export async function deleteMap(mapID: string, authorID: string, userID: string) {
    const promises = []
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, mapID);
    promises.push(deleteDoc(docRef));

    const urlList = [
        `maps/${authorID}/${mapID}.png`,
        `maps/${authorID}/${mapID}.lim`,
        `maps/${authorID}/${mapID}.lim2`
    ]

    if (authorID === userID) {
        for (const url of urlList) {
            const storageRef = ref(storage, url);
            promises.push(deleteObject(storageRef));
        }
    }

    await Promise.all(promises).catch((e) => {
        console.error(e);
    });
}

export function useLiked(mapID?: string) {
    const [isLiked, setLiked] = React.useState(false);
    const user = useUser();

    const canLike = !!mapID && !!user;

    const getLikeRef = React.useCallback(() => {
        if (!canLike)
            return null;

        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);
        const likesRef = collection(docRef, "likes");
        const likeRef = doc(likesRef, user?.uid);
        return likeRef;
    }, [canLike, mapID, user]);

    React.useEffect(() => {
        const likeRef = getLikeRef();
        if (likeRef) {
            getDoc(likeRef).then(doc => {
                setLiked(doc.exists());
            });
        }
    }, [getLikeRef]);

    const toggleLike = async () => {
        setLiked(liked => !liked);
        const likeRef = getLikeRef();
        if (likeRef) {
            if (isLiked) {
                await deleteDoc(likeRef);
            } else {
                await setDoc(likeRef, {});
            }
        }
    }


    return [isLiked, toggleLike, canLike] as const;
}