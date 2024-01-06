import React from "react";
import useUser from "./useUser";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";

export default function useMapLikes(mapID?: string) {
    const [isLiked, setLiked] = React.useState(false);
    const user = useUser();

    const canLike = !!mapID && !!user;

    const getLikeRef = React.useCallback(() => {
        if (!canLike)
            return null;

        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);
        const likesRef = collection(docRef, "likes");
        const likeRef = doc(likesRef, user?.uid);
        return likeRef;
    }, [canLike, mapID, user]);

    React.useEffect(() => {
        const likeRef = getLikeRef();
        if (likeRef) {
            getDoc(likeRef).then(doc => {
                setLiked(doc.exists());
            });
        }
    }, [getLikeRef]);

    const toggleLike = React.useCallback(async () => {
        setLiked(liked => !liked);
        const likeRef = getLikeRef();
        if (likeRef) {
            if (isLiked) {
                await deleteDoc(likeRef);
            } else {
                await setDoc(likeRef, {});
            }
        }
    }, [getLikeRef, isLiked]);

    return [isLiked, toggleLike, canLike] as const;
}