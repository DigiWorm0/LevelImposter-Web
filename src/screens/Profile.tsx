import { Alert, Badge } from 'react-bootstrap';
import { sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import React from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapThumbnail from '../components/map/MapThumbnail';
import { auth } from '../hooks/Firebase';
import useMaps from '../hooks/useMaps';
import useUser from '../hooks/useUser';

export default function Profile() {
    const [user] = useAuthState(auth);
    const userData = useUser();
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = React.useState('');
    const mapList = useMaps(user?.uid, true);

    React.useEffect(() => {
        setDisplayName(user?.displayName || '');
    }, [user]);

    const sendVerification = () => {
        if (!user)
            return;

        sendEmailVerification(user).then(() => {
            setError('Verification email sent to ' + user.email);
        }).catch(error => {
            setError(error.message);
        });
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Profile">
                <Row style={{ marginTop: 20 }}>
                    <Col xs={12}>
                        <Alert
                            style={{ margin: 10 }}
                            variant="danger"
                            show={error !== undefined}
                            onClose={() => setError(undefined)}>

                            {error}

                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                        <img
                            src={user.photoURL ? user.photoURL : '/logo512.png'}
                            alt={user.displayName ? user.displayName : 'New User'}
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 20,
                            }}
                        />
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
                            }}>
                            {isEditing ? 'Cancel' : 'Edit Name'}
                        </Button>
                        {isEditing && (
                            <Button
                                style={{ marginLeft: 5 }}
                                variant="success"
                                onClick={() => {
                                    updateProfile(user, {
                                        displayName: displayName,
                                    }).then(() => {
                                        setIsEditing(e => !e);
                                    });
                                }}>
                                Save
                            </Button>
                        )}
                        <Button
                            style={{ marginLeft: 5 }}
                            variant="danger"
                            onClick={() => {
                                signOut(auth);
                            }}>

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
                                onClick={sendVerification}>

                                Re-send Verification Email

                            </Button>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 8, offset: 2 }}>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <h3>Your Maps:</h3>

                        <ListGroup>
                            {mapList.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>

                        {mapList.length === 0 && (
                            <p>You haven't uploaded a map yet! You can make and upload maps using our <a href="https://editor.levelimposter.net/">editor</a>.</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 8, offset: 2 }}>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <p>
                                {user.uid}
                            </p>
                            {userData?.isAdmin && (
                                <Badge
                                    pill
                                    bg="danger"
                                    style={{ marginLeft: 5 }}>
                                    Admin
                                </Badge>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
