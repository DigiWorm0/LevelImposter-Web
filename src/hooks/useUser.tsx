import { collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { LIUser } from "../types/LIUser";
import { db } from "./Firebase";

export default function useUser() {
    return React.useContext(UserContext);
}

export function _useUser(uid?: string) {
    const [user, setUser] = React.useState<LIUser | undefined>(undefined);

    React.useEffect(() => {
        if (!uid)
            return;
        const usersRef = collection(db, 'users');
        const docRef = doc(usersRef, uid);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                setUser(doc.data() as LIUser);
            }
        });
    }, [uid]);

    return user;
}

export const UserContext = React.createContext<LIUser | undefined>(undefined);