import React from 'react';
import openUploadDialog from './openUploadDialog';
import useUser, { useUpdateUser } from './useUser';

const IMG_WIDTH = 128;
const IMG_HEIGHT = 128;

export default function useUploadProfile() {
    const userData = useUser();
    const updateUser = useUpdateUser();

    const uploadProfileImage = React.useCallback((onError: (err: string) => void) => {
        openUploadDialog("image/*").then((result) => {
            if (!userData)
                return;

            // Resize image
            const img = new Image();
            img.src = result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (ctx === null)
                    return;

                canvas.width = IMG_WIDTH;
                canvas.height = IMG_HEIGHT;
                ctx.drawImage(img, 0, 0, IMG_WIDTH, IMG_HEIGHT);
                const dataURL = canvas.toDataURL("image/jpeg");

                updateUser({
                    ...userData,
                    photoURL: dataURL
                }).then(() => {
                    window.location.reload();
                }).catch((err) => {
                    onError(err);
                });
            }
        }).catch((err) => {
            onError(err);
        });
    }, [userData, updateUser]);

    return uploadProfileImage;
}