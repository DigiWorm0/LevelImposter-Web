import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ShieldFillX } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useBanUser from "../../hooks/useBanUser";

export default function UserBanBtn(props: { id: string }) {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useUser();
    const navigate = useNavigate();
    const banUser = useBanUser();

    const onClick = React.useCallback(() => {
        if (!userData)
            return;

        banUser(props.id).then(() => {
            console.log(`Banned user ${props.id}`);
            navigate("/maps");
        }).catch((err: any) => {
            console.error(err);
            alert(err);
        });
    }, [props.id, userData, banUser, navigate]);

    // Admins-only
    if (!userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                size={"sm"}
                variant="outline-warning"
                onClick={() => setModalOpen(true)}
                className={"m-2"}
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
                    <p>
                        Are you <i>100% sure</i> you want to <b>b-b-ban</b> this account?
                        This will delete any uploaded maps and prevent the user from logging in.
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
                        Ban
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}