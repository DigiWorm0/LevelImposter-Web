import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { db } from "../../hooks/Firebase";
import useUser from "../../hooks/useUser";

export default function MapVerifyButton(props: { id: string, isVerified: boolean, isPublic: boolean }) {
    const [isModalOpen, setModalOpen] = React.useState(false);
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
                    isVerified: !props.isVerified
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
    const verifyText = props.isVerified ? "Unfeature" : "Feature";

    if (!userData?.isAdmin || !props.isPublic)
        return null;

    return (
        <>
            <Button
                variant="warning"
                onClick={() => setModalOpen(true)}
                style={{ marginBottom: 10, marginRight: 10 }}>

                {props.isVerified ? (
                    <Star size={18} />
                ) : (
                    <StarFill size={18} />
                )}

            </Button>

            <Modal
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered>

                <Modal.Header closeButton>
                    <Modal.Title>{verifyText} Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to <b>{verifyText.toLowerCase()}</b> this map?</p>
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
                        {verifyText} Map
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}