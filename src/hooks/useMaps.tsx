import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import LIMetadata from "../types/LIMetadata";
import { db, storage } from "./Firebase";

const MAX_PER_PAGE = 20;

export default function useMaps(userID?: string, includePrivate?: boolean) {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const storeRef = collection(db, "maps");
        const mapQueries = [];
        if (userID)
            mapQueries.push(where("authorID", "==", userID));
        if (!includePrivate)
            mapQueries.push(where("isPublic", "==", true));
        mapQueries.push(limit(MAX_PER_PAGE));
        const mapsQuery = query(storeRef, ...mapQueries);

        getDocs(mapsQuery).then(docs => {
            setMapList(docs.docs.map(doc => doc.data() as LIMetadata));
        });
    }, [userID, includePrivate]);

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

export async function deleteMap(mapID: string, authorID: string) {
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, mapID);
    const docPromise = deleteDoc(docRef);

    const storageURL = `maps/${authorID}/${mapID}.lim`;
    const storageRef = ref(storage, storageURL);
    console.log(storageRef.name);
    const storagePromise = deleteObject(storageRef);

    await Promise.all([docPromise, storagePromise]);
}