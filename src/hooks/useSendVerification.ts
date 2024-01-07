import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/Firebase";
import { sendEmailVerification } from "firebase/auth";
import React from "react";

export default function useSendVerification() {
    const [user] = useAuthState(auth);

    const isVerified = user?.emailVerified ?? false;

    const sendVerification = React.useCallback(async () => {
        if (!user)
            return Promise.reject("User not logged in");

        await sendEmailVerification(user);
        return Promise.resolve(user?.email);
    }, [user]);

    return [isVerified, sendVerification] as const;
}