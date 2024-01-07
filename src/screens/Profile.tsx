import { sendEmailVerification, signOut } from 'firebase/auth';
import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import { auth } from '../hooks/utils/Firebase';
import { useUserMaps } from '../hooks/useMaps';
import useCurrentUser from '../hooks/useUser';
import MapThumbnails from "../components/map/MapThumbnails";
import useSetUserData from "../hooks/useSetUserData";
import { Check, PencilFill, X } from "react-bootstrap-icons";
import ClickToShow from "../components/common/ClickToShow";
import DisplayTag from "../components/common/DisplayTag";
import TagType from "../types/TagType";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
    const [user] = useAuthState(auth);
    const userData = useCurrentUser();
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = React.useState('');
    const userMaps = useUserMaps(userData?.uid);
    const setUserData = useSetUserData();

    React.useEffect(() => {
        setDisplayName(userData?.displayName || '');
    }, [userData]);

    const onSaveProfile = React.useCallback(() => {
        if (!displayName || !userData)
            return;
        setUserData({
            ...userData,
            displayName: displayName,
        }).then(() => {
            userData.displayName = displayName; // Update local copy
            setIsEditing(false);
            setError(undefined);
        }).catch(error => {
            console.error(error);
            setError(error.message);
        });
    }, [userData, displayName]);

    const sendVerification = React.useCallback(() => {
        if (!user)
            return;

        sendEmailVerification(user).then(() => {
            setError('Verification email sent to ' + user.email);
        }).catch(error => {
            setError(error.message);
        });
    }, [user]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <LIHelmet
                title={`${userData?.displayName ?? "Anonymous"} - Profile`}
                description="View your profile and maps."
                URL={`https://LevelImposter.net/#/Profile`}
            />
            <MainHeader />
            <Container className="Profile">
                <Row>
                    <Col xs={12}>
                        <Alert
                            className={"m-3"}
                            variant="danger"
                            show={error !== undefined}
                            onClose={() => setError(undefined)}
                        >
                            {error}
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs={7} className={"ms-lg-5 mt-5"}>
                        <h3>
                            <img
                                referrerPolicy="no-referrer"
                                src={userData?.photoURL || "/editor.svg"}
                                alt={userData?.displayName || "Anonymous"}
                                width={50}
                                height={50}
                                className={"rounded me-3"}
                                style={{ objectFit: 'cover' }}
                            />
                            {isEditing && (
                                <>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Display Name"
                                        value={displayName}
                                        className={"bg-dark text-white border-0 d-inline"}
                                        style={{ maxWidth: 200 }}
                                        autoFocus
                                        onFocus={(e) => e.target.select()}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setDisplayName(e.target.value);
                                        }}
                                    />
                                    <X
                                        color={"#999"}
                                        size={24}
                                        style={{ marginLeft: 10, cursor: 'pointer' }}
                                        onClick={() => setIsEditing(false)}
                                    />
                                    <Check
                                        color={"#999"}
                                        size={24}
                                        style={{ marginLeft: 10, cursor: 'pointer' }}
                                        onClick={onSaveProfile}
                                    />
                                </>
                            )}
                            {!isEditing && (
                                <>
                                    {displayName || "Anonymous"}
                                    <PencilFill
                                        color={"#999"}
                                        size={14}
                                        style={{ marginLeft: 10, cursor: 'pointer' }}
                                        onClick={() => setIsEditing(true)}
                                    />
                                </>
                            )}
                        </h3>
                    </Col>
                    <Col className={"me-lg-5 mt-5"}>
                        <Button
                            variant="danger"
                            className={"float-end me-1 mt-1"}
                            onClick={() => signOut(auth)}
                        >
                            Sign out
                        </Button>
                        {!user?.emailVerified && (
                            <Button
                                variant="secondary"
                                className={"float-end me-1 mt-1"}
                                onClick={sendVerification}
                            >
                                Re-send Verification Email
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapThumbnails
                            maps={userMaps.maps}
                        />

                        {userMaps.maps.length === 0 && (
                            <p className="text-center text-muted">
                                You haven't uploaded a map yet! You can make and upload maps using our <a
                                href="https://editor.levelimposter.net/">editor</a>.
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={"text-center mt-1"}>

                            {userData?.isAdmin && <DisplayTag type={TagType.Admin} />}
                            {userData?.isCreator && <DisplayTag type={TagType.Creator} />}
                            {!user?.emailVerified && <DisplayTag type={TagType.Unverified} />}

                            <ClickToShow buttonText={"Click to show your user ID"}>
                                <p>{userData?.uid}</p>
                            </ClickToShow>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
