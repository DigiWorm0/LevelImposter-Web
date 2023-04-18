import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { LIUser } from "../types/LIUser";
import { db } from "./Firebase";

export default function useAdminTools() {
    const setUserBanned = React.useCallback((uid: string, isBanned: boolean) => {
        return new Promise((resolve, reject) => {
            const usersRef = collection(db, 'users');
            const docRef = doc(usersRef, uid);
            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data() as LIUser;
                    data.banned = isBanned;
                    setDoc(docRef, data);
                    resolve("Done");
                }
                else {
                    reject("User does not exist");
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }, []);

    const deleteUser = React.useCallback((uid: string) => {
        return new Promise((resolve, reject) => {
            const usersRef = collection(db, 'users');
            const docRef = doc(usersRef, uid);
            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data() as LIUser;
                    data.deleted = true;
                    setDoc(docRef, data);
                    resolve("Done");
                }
                else {
                    reject("User does not exist");
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }, []);

    return { setUserBanned, deleteUser };
}