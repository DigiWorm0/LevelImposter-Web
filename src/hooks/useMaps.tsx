import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, setDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import React from "react";
import LIMetadata from "../types/LIMetadata";
import { db, storage } from "./Firebase";
import useUser from "./useUser";

const MAX_PER_PAGE = 100;

export function useUserMaps(userID?: string) {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);
    const user = useUser();

    React.useEffect(() => {
        const mapQueries = [];
        if (!user?.isAdmin)
            mapQueries.push(where("isPublic", "==", true));
        mapQueries.push(
            where("authorID", "==", userID),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        );
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, [userID, user]);

    return mapList;
}

export function useVerifiedMaps() {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            where("isVerified", "==", true),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        ];
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, []);

    return mapList;
}

export function useRecentMaps() {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        ];
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, []);

    return mapList;
}

export function useTopMaps() {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const mapQueries = [
            where("isPublic", "==", true),
            orderBy("likeCount", "desc"),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        ];
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, []);

    return mapList;
}

export function usePrivateMaps() {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);
    const user = useUser();

    React.useEffect(() => {
        if (!user?.isAdmin) return setMapList([]);

        const mapQueries = [
            where("isPublic", "==", false),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        ];
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, [user]);

    return mapList;
}

async function _getMaps(contraints: QueryConstraint[]) {
    const storeRef = collection(db, "maps");
    const mapsQuery = query(storeRef, ...contraints);
    const docs = await getDocs(mapsQuery);
    return docs.docs.map(doc => doc.data() as LIMetadata);
}

export function useMap(mapID?: string) {
    const [map, setMap] = React.useState<LIMetadata | undefined | null>(undefined);

    React.useEffect(() => {
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

    if (authorID === userID) {
        const storageURL = `maps/${authorID}/${mapID}.lim`;
        const storageRef = ref(storage, storageURL);
        promises.push(deleteObject(storageRef));
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

export function useThumbnail(authorID?: string, mapID?: string) {
    const [thumbnail, setThumbnail] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const storageURL = `maps/${authorID}/${mapID}.png`;
        const storageRef = ref(storage, storageURL);
        getDownloadURL(storageRef).then(url => {
            setThumbnail(url);
        });
    }, [authorID, mapID]);

    return thumbnail;
}