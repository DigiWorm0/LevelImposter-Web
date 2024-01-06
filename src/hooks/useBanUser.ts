import React from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";

export default function useBanUser() {
    return React.useCallback(async (uid: string) => {

        // Firestore References
        const usersRef = collection(db, 'users');
        const docRef = doc(usersRef, uid);

        // Get User Data
        const userDataDoc = await getDoc(docRef);
        if (!userDataDoc.exists())
            throw Error("User data does not exist");

        // Update User Data
        const data = userDataDoc.data();
        await setDoc(docRef, {
            ...data,
            isBanned: true
        });
        
    }, []);
}