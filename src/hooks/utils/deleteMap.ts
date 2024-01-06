import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { deleteObject, ref } from "firebase/storage";

export default async function deleteMap(mapID: string, authorID: string, userID: string) {
    const promises = [];
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

    try {
        return await Promise.all(promises);
    } catch (error: any) {
        // Do nothing if the object is not found
        if (error.code === "storage/object-not-found")
            console.log(error);
        else
            throw error;
    }
}