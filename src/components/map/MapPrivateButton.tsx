import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { db } from "../../hooks/utils/Firebase";
import useCurrentUser from "../../hooks/useUser";

export interface MapPrivateButtonProps {
    id: string;
    isPublic: boolean;
}

export default function MapPrivateButton(props: MapPrivateButtonProps) {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [removalReason, setRemovalReason] = React.useState("");
    const userData = useCurrentUser();

    const onClick = React.useCallback(() => {
        if (!userData?.isAdmin)
            return;

        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, props.id);
        getDoc(docRef).then(doc => {
            const data = doc.data();
            return setDoc(docRef, {
                ...data,
                isPublic: !props.isPublic,
                removalReason: removalReason.length > 0 ? removalReason : null
            })
        }).then(() => {
            console.log(`Made map ${props.id} ${props.isPublic ? "private" : "public"}`);
            setModalOpen(false);
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert(err);
        })
    }, [props.id, props.isPublic, userData, removalReason]);
    const privateText = props.isPublic ? "Private" : "Public";

    if (!userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="outline-secondary"
                onClick={() => setModalOpen(true)}
                className={"mt-2 w-100 d-flex align-items-center justify-content-center"}
            >
                <EyeFill size={20} className={"me-2"} />
                {privateText}
            </Button>

            <Modal
                contentClassName="bg-dark text-light"
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{privateText} Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Are you <i>100% sure</i> you want to make this map <b>{privateText.toLowerCase()}</b>?
                    </p>

                    {props.isPublic && (
                        <Form.Control
                            className="bg-dark text-light"
                            as="textarea"
                            rows={3}
                            placeholder="Reason for removal"
                            value={removalReason}
                            onChange={(e) => setRemovalReason(e.target.value)}
                        />
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="warning"
                        onClick={onClick}
                    >
                        Make {privateText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}