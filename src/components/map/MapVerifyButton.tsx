import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { db } from "../../hooks/utils/Firebase";
import useCurrentUser from "../../hooks/useUser";

export interface MapVerifyButtonProps {
    id: string;
    isVerified: boolean;
    isPublic: boolean;
}

export default function MapVerifyButton(props: MapVerifyButtonProps) {
    const [isModalOpen, setModalOpen] = React.useState(false);
    const userData = useCurrentUser();

    const onClick = React.useCallback(() => {
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, props.id);
        getDoc(docRef).then(doc => {
            const data = doc.data();
            return setDoc(docRef, {
                ...data,
                isVerified: !props.isVerified
            });
        }).then(() => {
            console.log(`Verified map ${props.id}`);
            setModalOpen(false);
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert(err);
        })
    }, [props.id, props.isVerified]);

    // Use for both verify and unverify
    const verifyText = props.isVerified ? "Unfeature" : "Feature";

    // Admins-only
    if (!userData?.isAdmin || !props.isPublic)
        return null;

    return (
        <>
            <Button
                variant="outline-warning"
                onClick={() => setModalOpen(true)}
                className={"mt-2 w-100 d-flex align-items-center justify-content-center"}
            >
                <StarFill size={20} className={"me-2"} />
                {verifyText}
            </Button>

            <Modal
                contentClassName="bg-dark text-light"
                show={isModalOpen}
                onHide={() => setModalOpen(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{verifyText} Map</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you <i>100% sure</i> you want to <b>{verifyText.toLowerCase()}</b> this map?</p>
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
                        {verifyText} Map
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}