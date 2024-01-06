import { getDownloadURL, ref } from "firebase/storage";
import { Button } from "react-bootstrap";
import { storage } from "../../hooks/utils/Firebase";
import React from "react";
import { CloudDownloadFill } from "react-bootstrap-icons";

export interface MapDownloadBtnProps {
    id: string;
    authorID: string;
    downloadCount?: number;
}

export default function MapDownloadBtn(props: MapDownloadBtnProps) {

    const onError = React.useCallback((err: any) => {
        console.error(err);
        alert(err);
    }, []);

    const onClick = React.useCallback(() => {
        const storageURL = `maps/${props.authorID}/${props.id}.lim`;
        const storageURL2 = `maps/${props.authorID}/${props.id}.lim2`;
        const storeRef = ref(storage, storageURL);
        const storeRef2 = ref(storage, storageURL2);

        getDownloadURL(storeRef).then((url) => {
            window.location.href = url;
        }).catch((err) => {
            if (err.code !== "storage/object-not-found") {
                onError(err);
                return;
            }

            getDownloadURL(storeRef2).then((url) => {
                window.location.href = url;
            }).catch(onError);
        });
    }, [props.authorID, props.id]);

    return (
        <Button
            variant="primary"
            size={"sm"}
            onClick={onClick}
            className={"d-flex align-items-center justify-content-center mt-2 w-100"}
        >
            <CloudDownloadFill className={"me-2"} />
            {props.downloadCount ?? 0}
            {' '}
            Downloads
        </Button>
    );
}