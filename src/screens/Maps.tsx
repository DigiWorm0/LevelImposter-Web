import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapThumbnail from '../components/map/MapThumbnail';
import useMaps from '../hooks/useMaps';
import useUser from '../hooks/useUser';

export default function Maps() {
    const userData = useUser();
    const [page] = React.useState(0);
    const mapList = useMaps(undefined, userData?.isAdmin, false, page);
    const verifiedMaps = useMaps(undefined, false, true, page);

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps" style={{ padding: 30 }}>
                <Row>
                    <Col sm={6}>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Featured Maps</h3>
                        <ListGroup>
                            {verifiedMaps.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    map={map}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={6}>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>Most Liked</h3>
                        <ListGroup>
                            {mapList.map((map) => (
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
