import React from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";
import { LIUser } from "../types/LIUser";

export default function useDeleteUser() {
    return React.useCallback((uid: string) => {
        return new Promise((resolve, reject) => {

            // Firestore References
            const usersRef = collection(db, 'users');
            const docRef = doc(usersRef, uid);

            // Get User Data
            getDoc(docRef).then((doc) => {

                // Check if user exists
                if (!doc.exists()) {
                    reject("User does not exist");
                    return;
                }

                // Mark User for Deletion
                const data = doc.data() as LIUser;
                data.isDeleted = true;
                setDoc(docRef, data).then(() => {
                    resolve("Done");
                }).catch((error) => {
                    reject(error);
                });

            }).catch((error) => {
                reject(error);
            });
        });
    }, []);
}
