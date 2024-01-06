import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useDeleteUser from "../../hooks/useDeleteUser";

export default function UserDeleteBtn(props: { id: string }) {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();
    const deleteUser = useDeleteUser();

    const onDelete = React.useCallback(() => {
        if (!userData)
            return;

        deleteUser(props.id).then(() => {
            console.log(`Deleted user ${props.id}`);
            navigate("/maps");
        }).catch((err: any) => {
            console.error(err);
            alert(err);
        });
    }, [props.id, userData, deleteUser, navigate]);

    if (!userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="outline-danger"
                onClick={() => setModalOpen(true)}
                size={"sm"}
                className={"m-2"}
            >
                Delete Account
            </Button>

            <Modal
                contentClassName="bg-dark text-light"
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to <b>delete</b> this account? This will delete all stored user
                        data including any uploaded maps. This action is permanent and irreversible.</p>
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