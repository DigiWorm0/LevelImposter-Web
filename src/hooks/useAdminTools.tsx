import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { LIUser } from "../types/LIUser";
import { db } from "./Firebase";

export default function useAdminTools() {
    const banUser = React.useCallback((uid: string) => {
        return new Promise((resolve, reject) => {
            const usersRef = collection(db, 'users');
            const docRef = doc(usersRef, uid);
            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data() as LIUser;
                    data.isBanned = true;
                    setDoc(docRef, data).then(() => {
                        resolve("Done");
                    }).catch((error) => {
                        reject(error);
                    });
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
                    data.isDeleted = true;
                    setDoc(docRef, data).then(() => {
                        resolve("Done");
                    }).catch((error) => {
                        reject(error);
                    });
                }
                else {
                    reject("User does not exist");
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }, []);

    return { banUser, deleteUser };
}