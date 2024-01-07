import useCurrentUser from "../../hooks/useUser";
import useSetUserData from "../../hooks/useSetUserData";
import React from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../hooks/utils/Firebase";

const IMAGE_SIZE = 256;

export default function EditableProfileImage() {
    const userData = useCurrentUser();
    const setUserData = useSetUserData();
    const [_, setV] = React.useState(0);

    const uploadImage = React.useCallback(async (blob: Blob) => {
        const storageURL = `users/${userData?.uid}/profilePicture.png`;
        const storeRef = ref(storage, storageURL);
        await uploadBytesResumable(storeRef, blob, { cacheControl: "public, max-age=604800" });
        return await getDownloadURL(storeRef);
    }, [userData]);

    const resizeImage = React.useCallback(async (file: File) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = IMAGE_SIZE;
        canvas.height = IMAGE_SIZE;
        ctx.drawImage(image, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob)
                    return reject(new Error("Failed to convert canvas to blob."));
                resolve(blob);
            }, 'image/png');
        });
    }, []);

    const onUpload = React.useCallback(async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file || !userData)
            return;

        const blob = await resizeImage(file);
        const url = await uploadImage(blob);
        await setUserData({
            ...userData,
            photoURL: url,
        });
        userData.photoURL = url; // Update local copy
        setV(v => v + 1);
    }, [userData]);

    const onClick = React.useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            onUpload(event).catch(error => {
                console.error(error);
                alert(error.message);
            });
        };
        input.click();
    }, [onUpload]);

    return (
        <img
            referrerPolicy="no-referrer"
            src={userData?.photoURL || "/editor.svg"}
            alt={userData?.displayName || "Anonymous"}
            width={50}
            height={50}
            onClick={onClick}
            className={"rounded me-3 object-fit-cover"}
            style={{ cursor: "pointer" }}
        />
    )
}