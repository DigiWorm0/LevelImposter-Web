import { signOut } from 'firebase/auth';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import MainHeader from '../components/MainHeader';
import { auth } from '../hooks/Firebase';
import { Navigate } from 'react-router-dom';
import useMaps from '../hooks/useMaps';

export default function Profile() {
    const [user] = useAuthState(auth);
    const mapList = useMaps(user?.uid, true);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <MainHeader />
            <Container fluid className="Login">
                <Row>
                    <Col xs={{ span: 1, offset: 3 }} style={{ textAlign: "center" }}>
                        <img
                            src={user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'}
                            alt={user.displayName ? user.displayName : 'User'}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                marginTop: 30,
                                marginBottom: 30,
                            }}
                        />
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <h2 style={{ marginTop: 30 }}>
                            {user.displayName}
                        </h2>
                        <h6>
                            {user.email}
                        </h6>
                        <Button
                            variant="primary"
                            onClick={() => {
                                signOut(auth);
                            }}>

                            Sign out

                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 4 }}>
                        <h3>Your Maps:</h3>

                        <ListGroup>
                            {mapList.map((map) => (
                                <ListGroup.Item key={map.id} href={"/map/" + map.id} action>
                                    <h5>{map.name}</h5>
                                    <p>{map.description === "" ? <i>No Description</i> : map.description}</p>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
