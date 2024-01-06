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
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();

    const onClick = React.useCallback(() => {
        if (!userData)
            return;

        deleteMap(props.id, props.authorID, userData.uid).then(() => {
            console.log(`Deleted map ${props.id}`);
            navigate("/maps");
        }).catch((err: any) => {
            console.error(err);
            alert(err);
        });
    }, [props.id, props.authorID, userData, navigate]);

    if (userData?.uid !== props.authorID && !userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="outline-danger"
                onClick={() => setModalOpen(true)}
                className={"mt-2 w-100 d-flex align-items-center justify-content-center"}
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
                        Are you <i>100% sure</i> you want to <b>delete</b> this map?
                        {' '}
                        This action is permanent and irreversible.
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
                        onClick={onClick}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}