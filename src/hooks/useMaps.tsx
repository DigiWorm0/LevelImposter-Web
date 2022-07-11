import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LIMapFile from "../types/LIMapFile";
import LIMetadata from "../types/LIMetadata";
import { auth, db, storage } from "./Firebase";
import generateGUID from "./generateGUID";

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

export function useMapUploader(): [() => void, (mapData: LIMapFile) => void] {
    const [user] = useAuthState(auth);

    const openDialog = () => {
        const input = document.createElement('input');
        input.type = "file";
        input.accept = ".lim,application/levelimposter.map";
        input.onchange = (e) => {
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const data = reader.result;
                console.log(data);
                if (typeof data === "string") {
                    uploadMap(JSON.parse(data) as LIMapFile);
                }
            }
            reader.readAsText(file);
        }
        input.click();
    }

    const uploadMap = async (mapData: LIMapFile) => {
        if (!user) {
            console.error("User not logged in");
            return;
        }

        // Parse
        const mapJSON = JSON.stringify(mapData);
        mapData.id = generateGUID();

        // Storage
        const storageRef = ref(storage, `maps/${user.uid}/${mapData.id}.lim`);
        const storageDoc = await uploadString(storageRef, mapJSON);
        const storageURL = await getDownloadURL(storageDoc.ref);
        console.log(`Map uploaded to ${storageURL}`);

        // Firestore
        const storeRef = collection(db, "maps");
        const mapDocument = await addDoc(storeRef, {
            id: mapData.id,
            name: mapData.name,
            description: mapData.description,
            authorID: user.uid,
            storageURL: storageURL,
        } as LIMetadata);
        console.log(`Map added to Firestore: ${mapDocument.id}`);

        return mapDocument.id;
    }

    return [openDialog, uploadMap];
}

