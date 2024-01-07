import React from "react";
import LIUser from "../types/LIUser";
import getUser from "./utils/getUser";

export const UserContext = React.createContext<LIUser | undefined>(undefined);

export default function useCurrentUser() {
    return React.useContext(UserContext);
}

export function useUser(uid?: string) {
    const [user, setUser] = React.useState<LIUser | undefined>(undefined);

    React.useEffect(() => {
        setUser(undefined);
        if (!uid)
            return;
        getUser(uid).then(setUser).catch(console.error);
    }, [uid]);

    return user;
}