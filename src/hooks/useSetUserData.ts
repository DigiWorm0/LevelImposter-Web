import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./utils/Firebase";
import React from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import LIUser from "../types/LIUser";

export default function useSetUserData() {
    const [user] = useAuthState(auth);

    return React.useCallback((userData: LIUser) => {
        if (!user)
            return Promise.reject("User not logged in");

        const usersRef = collection(db, "users");
        const userRef = doc(usersRef, user.uid);
        return setDoc(userRef, {
            ...userData,

            // Remove Local Properties
            isAdmin: null,
            isCreator: null,
            isBanned: null,
            isDeleted: null,
        });
    }, [user]);
}