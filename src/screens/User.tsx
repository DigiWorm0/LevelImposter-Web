import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate, useParams } from 'react-router-dom';
import LIHelment from '../components/LIHelmet';
import MainHeader from '../components/MainHeader';
import MapBanner from '../components/map/MapBanner';
import { useUserMaps } from '../hooks/useMaps';
import useUser, { _useUser } from '../hooks/useUser';
import UserDeleteBtn from '../components/map/UserDeleteBtn';

export default function User() {
    const { id } = useParams();
    const user = useUser();
    const author = _useUser(id);
    const authorMaps = useUserMaps(id);

    const authorName = author?.displayName ? author.displayName : 'Unknown User';

    if (user?.uid === id) {
        return <Navigate to="/profile" />;
    }

    return (
        <>
            <LIHelment
                title={`${author?.displayName || "LevelImposter"} - User`}
                description={`View ${(author?.displayName + "'s") || "your"} profile and maps.`}
                URL={`https://LevelImposter.net/#/User/${id}`}
            />
            <MainHeader />
            <Container className="Maps">
                <Row>
                    <Col lg={12} style={{ textAlign: "center" }}>
                        <img
                            referrerPolicy="no-referrer"
                            src={author?.photoURL ? author.photoURL.replace("s96-c", "s200-c") : '/logo512.png'}
                            alt={authorName}
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 20,
                                marginTop: 30,
                            }}
                        />
                        <h5 style={{ textAlign: "center", marginTop: 20 }}>Maps by</h5>
                        <h3 style={{ textAlign: "center", marginBottom: 10 }}>{authorName}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ offset: 3, span: 6 }} style={{ textAlign: "center" }}>
                        <ListGroup>
                            {authorMaps.maps.map((map) => (
                                <MapBanner
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                            {authorMaps.maps.length === 0 && (
                                <p>
                                    No maps by this author.
                                </p>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col lg={{ offset: 3, span: 6 }} style={{ textAlign: "center" }}>
                        {author?.isAdmin && (
                            <Badge
                                pill
                                bg="danger"
                                style={{ marginLeft: 5 }}>
                                Admin
                            </Badge>
                        )}

                        {author?.isCreator && (
                            <Badge
                                pill
                                bg="primary"
                                style={{ marginLeft: 5 }}>
                                Creator
                            </Badge>
                        )}

                        {author?.banned && (
                            <Badge
                                pill
                                bg="danger"
                                style={{ marginLeft: 5 }}>
                                Banned
                            </Badge>
                        )}

                        {id && (
                            <UserDeleteBtn id={id} />
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
