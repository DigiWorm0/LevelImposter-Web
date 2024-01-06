import React from "react";
import useUser from "./useUser";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./utils/Firebase";

export default function useMapLikes(mapID?: string) {
    const [isLiked, setLiked] = React.useState(false);
    const user = useUser();

    const canLike = !!mapID && !!user;

    // Get the Like Document
    const getLikeDoc = React.useCallback(() => {
        if (!canLike)
            return null;

        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);
        const likesRef = collection(docRef, "likes");
        return doc(likesRef, user?.uid);
    }, [canLike, mapID, user]);

    // Set the current like state
    React.useEffect(() => {
        const likeRef = getLikeDoc();
        if (likeRef)
            getDoc(likeRef).then(doc => setLiked(doc.exists()));
    }, [getLikeDoc]);

    // Toggle the like state
    const toggleLike = React.useCallback(async () => {
        setLiked(liked => !liked);
        const likeRef = getLikeDoc();
        if (!likeRef)
            return;

        if (isLiked)
            await deleteDoc(likeRef);
        else
            await setDoc(likeRef, {});
    }, [getLikeDoc, isLiked]);

    return [isLiked, toggleLike, canLike] as const;
}