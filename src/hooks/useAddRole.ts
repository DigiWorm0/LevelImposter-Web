import React from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";
import LIRoles from "../types/LIRoles";

export default function useAddRole(roleID: LIRoles) {
    return React.useCallback(async (uid: string) => {

        // Firestore References
        const usersRef = collection(db, 'users');
        const userDataRef = doc(usersRef, uid);
        const rolesRef = collection(userDataRef, 'roles');
        const roleRef = doc(rolesRef, roleID);

        // Set Role
        await setDoc(roleRef, {});

    }, []);
}
