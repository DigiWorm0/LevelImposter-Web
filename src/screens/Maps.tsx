import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapBanner from '../components/map/MapBanner';
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
                    <Col>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Featured Maps</h3>
                        <ListGroup horizontal>
                            {featuredMaps.map((map, index) => (
                                <>
                                    <MapThumbnail
                                        key={map.id}
                                        map={map}
                                    />
                                    {index % 2 === 1 && <br />}
                                </>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <h3 style={{ textAlign: "center", marginTop: 15 }}>Most Liked</h3>
                        <ListGroup>
                            {topMaps.map((map) => (
                                <MapBanner
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={5}>
                        <h3 style={{ textAlign: "center", marginTop: 15 }}>Recent</h3>
                        <ListGroup>
                            {recentMaps.map((map) => (
                                <MapBanner
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
