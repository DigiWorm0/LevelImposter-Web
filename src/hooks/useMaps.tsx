import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import LIMetadata from "../types/LIMetadata";
import { db, storage } from "./Firebase";

const MAX_PER_PAGE = 20;

export default function useMaps(userID?: string, includePrivate?: boolean, verifiedOnly?: boolean, page = 0) {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const storeRef = collection(db, "maps");
        const mapQueries = [];
        if (userID)
            mapQueries.push(where("authorID", "==", userID));
        if (!includePrivate)
            mapQueries.push(where("isPublic", "==", true));
        if (verifiedOnly)
            mapQueries.push(where("isVerified", "==", true));
        mapQueries.push(
            orderBy("createdAt"),
            limit(MAX_PER_PAGE),
            startAfter(MAX_PER_PAGE * page)
        );
        const mapsQuery = query(storeRef, ...mapQueries);

        getDocs(mapsQuery).then(docs => {
            setMapList(docs.docs.map(doc => doc.data() as LIMetadata));
        });
    }, [userID, includePrivate, verifiedOnly, page]);

    return mapList;
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