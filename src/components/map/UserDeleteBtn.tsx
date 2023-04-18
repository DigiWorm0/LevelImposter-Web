import React from "react";
import { Button, Modal } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAdminTools from "../../hooks/useAdminTools";

export default function UserDeleteBtn(props: { id: string }) {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();
    const adminTools = useAdminTools();

    const onDelete = React.useCallback(() => {
        if (!userData)
            return;

        setIsDeleting(true);
        adminTools.deleteUser(props.id).then(() => {
            setIsDeleting(false);
            navigate("/maps");
            console.log(`Deleted user ${props.id}`);
        }).catch((err: any) => {
            console.error(err);
            alert(err);
            setIsDeleting(false);
        });
    }, [props.id, userData, adminTools, navigate]);

    if (!userData?.isAdmin && userData?.uid !== props.id)
        return null;

    return (
        <>
            <Button
                variant="danger"
                onClick={() => setModalOpen(true)}
                disabled={isDeleting}
                style={{ marginTop: 8, flex: "1 1 auto", width: "100%", display: "flex", justifyContent: "center" }}
            >
                <TrashFill
                    size={20}
                    style={{ marginRight: 10 }}
                />
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
                    <p>Are you <i>100% sure</i> you want to <b>delete</b> this account? This will delete all stored user data including any uploaded maps. This action is permanent and irreversible.</p>
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