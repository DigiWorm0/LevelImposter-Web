import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/Firebase";
import React from "react";
import { LIUser } from "../types/LIUser";
import { updateProfile } from "firebase/auth";

export default function useUpdateUser() {
    const [user] = useAuthState(auth);

    return React.useCallback((userData: LIUser) => {
        if (!user)
            return Promise.reject("User not logged in");
        return updateProfile(user, {
            displayName: userData.displayName,
            photoURL: userData.photoURL
        });
    }, [user]);
}