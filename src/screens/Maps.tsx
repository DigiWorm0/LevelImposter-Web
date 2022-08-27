import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapThumbnail from '../components/map/MapThumbnail';
import { useRecentMaps, useTopMaps, useVerifiedMaps } from '../hooks/useMaps';

export default function Maps() {
    const recentMaps = useRecentMaps();
    const topMaps = useTopMaps();
    const featuredMaps = useVerifiedMaps();

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps" style={{ padding: 30 }}>
                <Row>
                    <Col sm={7}>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Featured Maps</h3>
                        <ListGroup>
                            {featuredMaps.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Most Liked</h3>
                        <ListGroup>
                            {topMaps.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={5}>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Recent</h3>
                        <ListGroup>
                            {recentMaps.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        padding: 20
                    }}>
                        {/*
                        <Pagination>
                            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
                            <Pagination.Item active>{page + 1}</Pagination.Item>
                            <Pagination.Next onClick={() => setPage(page + 1)} />
                        </Pagination>
                        */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
