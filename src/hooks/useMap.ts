import React from "react";
import LIMetadata from "../types/LIMetadata";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";

/**
 * React hook to get a map from the database
 * @param mapID - The ID of the map to get
 * @returns The map object. Undefined if the map is still loading. Null if the map does not exist.
 */
export default function useMap(mapID?: string) {
    const [map, setMap] = React.useState<LIMetadata | undefined | null>(undefined);

    React.useEffect(() => {

        // Check Map ID
        if (!mapID)
            return setMap(null);

        // Get Document
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