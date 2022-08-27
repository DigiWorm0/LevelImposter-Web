import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { db } from "../../hooks/Firebase";
import useUser from "../../hooks/useUser";

export default function MapPrivateButton(props: { id: string, isPublic: boolean }) {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [removalReason, setRemovalReason] = React.useState("");
    const userData = useUser();

    const onVerify = () => {
        if (!userData?.isAdmin)
            return;

        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, props.id);
        getDoc(docRef).then(doc => {
            if (doc.exists()) {
                const data = doc.data();
                setDoc(docRef, {
                    ...data,
                    isPublic: !props.isPublic,
                    removalReason: (removalReason.length > 0 && props.isPublic) ? removalReason : null
                }).then(() => {
                    setModalOpen(false);
                    window.location.reload();
                }).catch(err => {
                    console.error(err);
                    alert(err);
                })
            }
        });
    }
    const privateText = props.isPublic ? "Private" : "Public";

    if (!userData?.isAdmin)
        return null;

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setModalOpen(true)}
                style={{ marginBottom: 10, marginRight: 10 }}>

                {props.isPublic ? (
                    <EyeSlashFill size={20} />
                ) : (
                    <EyeFill size={20} />
                )}

            </Button>

            <Modal
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>{privateText} Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to make this map <b>{privateText.toLowerCase()}</b>?</p>
                    {props.isPublic && (
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Reason for removal"
                            value={removalReason}
                            onChange={(e) => setRemovalReason(e.target.value)} />
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                    <Button
                        variant="warning"
                        onClick={onVerify}>
                        Make {privateText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}