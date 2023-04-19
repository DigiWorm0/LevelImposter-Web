import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { LIUser } from "../types/LIUser";
import { auth, db } from "./Firebase";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUser() {
    return React.useContext(UserContext);
}

export function _useUser(uid?: string) {
    const [user, setUser] = React.useState<LIUser | undefined>(undefined);

    React.useEffect(() => {
        if (!uid) {
            setUser(undefined);
            return;
        }
        const usersRef = collection(db, 'users');
        const docRef = doc(usersRef, uid);
        getDoc(docRef).then((doc) => {
            if (doc.exists())
                setUser(doc.data() as LIUser);
        });
    }, [uid]);

    return user;
}

export const UserContext = React.createContext<LIUser | undefined>(undefined);

export function useUpdateUser() {
    const [user] = useAuthState(auth);

    const updateUser = React.useCallback((userData: LIUser) => {
        const usersRef = collection(db, 'users');
        const docRef = doc(usersRef, userData.uid);
        return setDoc(docRef, userData).then(() => {
            if (!user)
                return;

            updateProfile(user, {
                displayName: userData.displayName,
                photoURL: userData.photoURL
            });
        });
    }, [user]);

    return updateUser;
}