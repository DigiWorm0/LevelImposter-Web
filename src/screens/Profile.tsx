import { sendEmailVerification, signOut } from 'firebase/auth';
import React from 'react';
import { Alert, Badge, Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import UserDeleteBtn from '../components/map/UserDeleteBtn';
import { auth } from '../hooks/utils/Firebase';
import { useUserMaps } from '../hooks/useMaps';
import useUser from '../hooks/useUser';
import MapThumbnails from "../components/map/MapThumbnails";
import useUpdateUser from "../hooks/useUpdateUser";
import { Check, PencilFill, X } from "react-bootstrap-icons";

export default function Profile() {
    const [user] = useAuthState(auth);
    const userData = useUser();
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = React.useState('');
    const userMaps = useUserMaps(user?.uid);
    const updateUserData = useUpdateUser();

    React.useEffect(() => {
        setDisplayName(user?.displayName || '');
    }, [user]);

    const onSaveProfile = React.useCallback(() => {
        if (!user || !displayName || !userData)
            return;
        updateUserData({
            ...userData,
            photoURL: undefined,
            displayName: displayName,
        }).then(() => {
            setIsEditing(false);
            setError(undefined);
        }).catch(error => {
            setError(error.message);
        });
    }, [user, displayName]);

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
                title={`${user?.displayName ? user.displayName : "LevelImposter"} - Profile`}
                description="View your profile and maps."
                URL={`https://LevelImposter.net/#/Profile`}
            />
            <MainHeader />
            <Container className="Profile">
                <Row>
                    <Col xs={12}>
                        <Alert
                            style={{ margin: 10 }}
                            variant="danger"
                            show={error !== undefined}
                            onClose={() => setError(undefined)}
                        >
                            {error}
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} className={"ms-lg-5 mt-5"}>
                        <h3>
                            <img
                                referrerPolicy="no-referrer"
                                src={userData?.photoURL ?? '/logo512.png'}
                                alt={user.displayName ?? 'New User'}
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 14,
                                    borderRadius: 10,
                                    objectFit: 'cover',
                                }}
                            />
                            {isEditing && (
                                <>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Display Name"
                                        value={displayName}
                                        className={"bg-dark text-white border-0"}
                                        style={{ maxWidth: 200, display: "inline" }}
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
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
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
                                    {user.displayName ?? 'New User'}
                                    <PencilFill
                                        color={"#999"}
                                        size={14}
                                        style={{ marginLeft: 10, cursor: 'pointer' }}
                                        onClick={() => {
                                            setIsEditing(true);
                                        }}
                                    />
                                </>
                            )}
                        </h3>
                    </Col>
                    <Col className={"me-lg-5 mt-5"}>
                        <Button
                            style={{ marginLeft: 5 }}
                            variant="danger"
                            className={"float-end"}
                            onClick={() => {
                                signOut(auth);
                            }}
                        >
                            Sign out
                        </Button>
                        {!user?.emailVerified && (
                            <Button
                                style={{ margin: 5 }}
                                variant="secondary"
                                className={"float-end"}
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
                <Row style={{ margin: 20 }}>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <div style={{ textAlign: "center" }}>
                            <UserDeleteBtn id={user.uid} />

                            <div style={{ marginTop: 10 }}>
                                {userData?.isAdmin && (
                                    <Badge
                                        pill
                                        bg="danger"
                                        style={{ marginLeft: 5 }}>
                                        Admin
                                    </Badge>
                                )}
                                {userData?.isCreator && (
                                    <Badge
                                        pill
                                        bg="primary"
                                        style={{ marginLeft: 5 }}>
                                        Creator
                                    </Badge>
                                )}
                                {!user?.emailVerified && (
                                    <Badge
                                        pill
                                        bg="secondary"
                                        style={{ marginLeft: 5 }}>
                                        Unverified
                                    </Badge>
                                )}
                            </div>
                            <p className="fs-6 text-muted">
                                {user?.uid}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
