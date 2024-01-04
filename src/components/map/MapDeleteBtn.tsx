import React from "react";
import { Button, Modal } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import deleteMap from "../../hooks/utils/deleteMap";

export interface MapDeleteBtnProps {
    id: string;
    authorID: string;
}

export default function MapDeleteBtn(props: MapDeleteBtnProps) {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();

    const onDelete = () => {
        if (!userData)
            return;

        setIsDeleting(true);
        deleteMap(props.id, props.authorID, userData.uid).then(() => {
            setIsDeleting(false);
            navigate("/maps");
        }).catch((err: any) => {
            console.error(err);
            alert(err);
            setIsDeleting(false);
        });
    }

    if (userData?.uid !== props.authorID && !userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="danger"
                onClick={() => setModalOpen(true)}
                disabled={isDeleting}
                style={{ marginTop: 8, flex: "1 1 auto", width: "100%", display: "flex", justifyContent: "center" }}
            >
                <TrashFill size={20} style={{ marginRight: 10 }} />
                Delete
            </Button>

            <Modal
                contentClassName="bg-dark text-light"
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Are you <i>100% sure</i> you want to <b>delete</b> this map? This action is permanent and
                        irreversible.
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}