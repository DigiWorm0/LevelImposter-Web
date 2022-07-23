import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../hooks/Firebase";
import { deleteMap } from "../../hooks/useMaps";

export default function MapDeleteBtn(props: { id: string, authorID: string }) {
    const [user] = useAuthState(auth);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const onDelete = () => {
        setIsDeleting(true);
        deleteMap(props.id, props.authorID).then(() => {
            setIsDeleting(false);
            window.location.href = "/Profile";
        }).catch(err => {
            console.error(err);
            alert(err);
            setIsDeleting(false);
        });
    }

    if (user?.uid !== props.authorID)
        return null;

    return (
        <>
            <Button
                variant="danger"
                onClick={() => setModalOpen(true)}
                disabled={isDeleting}
                style={{ marginBottom: 10 }}>
                Delete Map
            </Button>
            <Modal
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>Delete Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to <b>delete</b> this map? This action is permanent and irreversible.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}