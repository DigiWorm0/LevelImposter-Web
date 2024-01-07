import React from "react";
import LIUser from "../types/LIUser";
import getUser from "./utils/getUser";

export const UserContext = React.createContext<LIUser | null | undefined>(undefined);

export default function useCurrentUser() {
    return React.useContext(UserContext);
}

export function useUser(uid?: string) {
    const [user, setUser] = React.useState<LIUser | undefined | null>(undefined);

    React.useEffect(() => {

        // Check UID
        setUser(null);
        if (!uid)
            return;

        // Load User Data
        setUser(undefined);
        getUser(uid).then(setUser).catch((e => {
            console.error(e);
            setUser(null);
        }));
    }, [uid]);

    return user;
}