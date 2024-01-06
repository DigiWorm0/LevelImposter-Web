import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { deleteObject, ref } from "firebase/storage";

export default function deleteMap(mapID: string, authorID: string, userID: string) {
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

    return Promise.all(promises);
}