import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import LIMetadata from "../../types/LIMetadata";

export default async function getMaps(mapIDs: string[]) {
    const storeRef = collection(db, "maps");

    // Get Map Documents
    const promises = mapIDs.map(async (mapID) => {
        const docRef = doc(storeRef, mapID);
        const mapDoc = await getDoc(docRef);
        return mapDoc.exists() ? mapDoc.data() as LIMetadata : null;
    });

    // Wait For All Maps
    const maps = await Promise.all(promises);
    return maps.filter(map => map !== null) as LIMetadata[];
}