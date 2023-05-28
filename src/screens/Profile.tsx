import { sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import React from 'react';
import { Alert, Badge, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import LIHelment from '../components/LIHelmet';
import MainHeader from '../components/MainHeader';
import MapBanner from '../components/map/MapBanner';
import UserDeleteBtn from '../components/map/UserDeleteBtn';
import { auth } from '../hooks/Firebase';
import { useUserMaps } from '../hooks/useMaps';
import useUser, { useUpdateUser } from '../hooks/useUser';
import useUploadProfile from '../hooks/useUploadProfile';
import { DoorOpenFill, PencilFill, SaveFill } from 'react-bootstrap-icons';

export default function Profile() {
    const [user] = useAuthState(auth);
    const userData = useUser();
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = React.useState('');
    const [isHovering, setIsHovering] = React.useState(false);
    const userMaps = useUserMaps(user?.uid);
    const updateUserData = useUpdateUser();
    const uploadProfile = useUploadProfile();

    React.useEffect(() => {
        setDisplayName(user?.displayName || '');
    }, [user]);

    const onSaveProfile = React.useCallback(() => {
        if (!user || !displayName || !userData)
            return;
        updateUserData({
            ...userData,
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
            <LIHelment
                title={`${user?.displayName ? user.displayName : "LevelImposter"} - Profile`}
                description="View your profile and maps."
                URL={`https://LevelImposter.net/#/Profile`}
            />
            <MainHeader />
            <Container className="Profile">
                <Row style={{ marginTop: 20 }}>
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
                    <Col lg={12} style={{ textAlign: "center" }}>
                        <button
                            disabled
                            /*onClick={() => uploadProfile(setError)}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}*/
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 20,
                                marginTop: 30,
                                transition: 'filter 0.2s',
                                filter: isHovering ? 'brightness(0.2)' : 'brightness(1)',
                                textDecoration: 'none',
                                border: 'none',
                                background: 'none',
                            }}
                        >
                            <img
                                referrerPolicy="no-referrer"
                                src={userData?.photoURL ? userData.photoURL.replace("s96-c", "s200-c") : '/logo512.png'}
                                alt={user.displayName ? user.displayName : 'New User'}
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 20,
                                    objectFit: 'cover',
                                }}
                            />
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                        {isEditing ? (
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Display Name"
                                value={displayName}
                                className={"bg-dark text-white border-0"}
                                autoFocus
                                onFocus={(e) => e.target.select()}
                                style={{ marginTop: 20, marginBottom: 20, textAlign: "center", fontSize: 32 }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDisplayName(e.target.value);
                                }}
                            />

                        ) : (
                            <>
                                <h2 style={{ marginTop: 20 }}>
                                    {user.displayName ? user.displayName : 'New User'}
                                </h2>
                            </>
                        )}
                        <Button
                            style={{ marginLeft: 5 }}
                            variant={'primary'}
                            onClick={() => {
                                setIsEditing(e => !e);
                            }}
                        >
                            {isEditing ? 'Cancel' : 'Edit Name'}
                        </Button>
                        {isEditing && (
                            <Button
                                style={{ marginLeft: 5 }}
                                variant="success"
                                onClick={onSaveProfile}
                            >
                                Save
                            </Button>
                        )}
                        <Button
                            style={{ marginLeft: 5 }}
                            variant="danger"
                            onClick={() => {
                                signOut(auth);
                            }}
                        >
                            Sign out
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: "center" }}>
                        {!user?.emailVerified && (
                            <Button
                                style={{ margin: 5 }}
                                variant="secondary"
                                onClick={sendVerification}
                            >
                                Re-send Verification Email
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <h3 style={{ marginTop: 20, textAlign: "center" }}>
                            <b>Your Maps:</b>
                        </h3>

                        <ListGroup>
                            {userMaps.maps.map((map) => (
                                <MapBanner
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>

                        {userMaps.maps.length === 0 && (
                            <p className="text-center text-muted">
                                You haven't uploaded a map yet! You can make and upload maps using our <a href="https://editor.levelimposter.net/">editor</a>.
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
