import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ShieldFillX } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useBanUser from "../../hooks/useBanUser";

export default function UserBanBtn(props: { id: string }) {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();
    const banUser = useBanUser();

    const onDelete = React.useCallback(() => {
        if (!userData)
            return;

        setIsDeleting(true);
        banUser(props.id).then(() => {
            setIsDeleting(false);
            navigate("/maps");
            console.log(`Banned user ${props.id}`);
        }).catch((err: any) => {
            console.error(err);
            alert(err);
            setIsDeleting(false);
        });
    }, [props.id, userData, banUser, navigate]);

    if (!userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="warning"
                onClick={() => setModalOpen(true)}
                disabled={isDeleting}
                style={{ marginTop: 8, flex: "1 1 auto", width: "100%", display: "flex", justifyContent: "center" }}
            >
                <ShieldFillX
                    size={20}
                    style={{ marginRight: 10 }}
                />
                Ban Account
            </Button>

            <Modal
                contentClassName="bg-dark text-light"
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ban User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to <b>b-b-ban</b> this account? This will delete any uploaded
                        maps and prevent the user from logging in.</p>
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
                        Ban
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}