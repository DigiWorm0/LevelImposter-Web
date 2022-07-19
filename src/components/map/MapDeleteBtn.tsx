import React from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../hooks/Firebase";
import { deleteMap } from "../../hooks/useMaps";

export default function MapDeleteBtn(props: { id: string, authorID: string }) {
    const [user] = useAuthState(auth);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const onDelete = () => {
        setIsDeleting(true);
        deleteMap(props.id, props.authorID).then(() => {
            setIsDeleting(false);
            window.location.href = "/";
        }).catch(err => {
            console.error(err);
            alert(err);
            setIsDeleting(false);
        });
    }

    if (user?.uid !== props.authorID)
        return null;

    return (
        <Button
            variant="danger"
            onClick={onDelete}
            disabled={isDeleting}
            style={{ marginBottom: 10 }}>
            Delete Map
        </Button>
    );
}