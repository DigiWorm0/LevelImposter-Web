import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapThumbnail from '../components/map/MapThumbnail';
import useMaps from '../hooks/useMaps';
import useUser, { _useUser } from '../hooks/useUser';

export default function User() {
    const { id } = useParams();
    const userData = useUser();
    const mapList = useMaps(id, userData?.isAdmin);
    const author = _useUser(id);

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps">
                {author ? (
                    <>
                        <Row>
                            <Col lg={12} style={{ textAlign: "center" }}>
                                <img
                                    src={author.photoURL ? author.photoURL : '/logo512.png'}
                                    alt={author.displayName ? author.displayName : 'New User'}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 20,
                                        marginTop: 10,
                                    }}
                                />
                                <h5 style={{ textAlign: "center", marginTop: 20 }}>Maps by</h5>
                                <h3 style={{ textAlign: "center", marginBottom: 10 }}>{author?.displayName}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 8, offset: 2 }}>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ offset: 3, span: 6 }} style={{ textAlign: "center" }}>
                                <ListGroup>
                                    {mapList.map((map) => (
                                        <MapThumbnail
                                            key={map.id}
                                            map={map}
                                        />
                                    ))}
                                    {mapList.length === 0 && (
                                        <p>
                                            No maps by this user.
                                        </p>
                                    )}
                                </ListGroup>
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
                                        {id}
                                    </p>
                                    {author?.isAdmin && (
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
                    </>
                ) : (
                    <Row>
                        <Col style={{ textAlign: "center", padding: 50 }}>
                            <Spinner animation="border" />
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}
