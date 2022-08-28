import React from "react";
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Clock, HeartFill, StarFill } from 'react-bootstrap-icons';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapBanners from '../components/map/MapBanners';
import { usePrivateMaps, useRecentMaps, useTopMaps, useVerifiedMaps } from '../hooks/useMaps';

export default function Maps() {
    const [tab, setTab] = React.useState<string | null>('top');
    const topMaps = useTopMaps();
    const featuredMaps = useVerifiedMaps();
    const recentMaps = useRecentMaps();
    const privateMaps = usePrivateMaps();

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps" style={{ padding: 30 }}>
                <Row>
                    <Col>
                        <h3 style={{ textAlign: "center", marginTop: 5 }}>
                            <StarFill color='gold' size={26} style={{ marginRight: 8, marginBottom: 5 }} />
                            Featured Maps
                        </h3>
                        <MapBanners maps={featuredMaps} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Nav
                            variant="tabs"
                            defaultActiveKey="top"
                            onSelect={setTab}>

                            <Nav.Item>
                                <Nav.Link eventKey="top">Most Liked</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="new">Most Recent</Nav.Link>
                            </Nav.Item>
                            {privateMaps.length > 0 && (
                                <Nav.Item>
                                    <Nav.Link eventKey="private" className={"text-secondary"}>Private Maps</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapBanners maps={
                            tab === 'top' ? topMaps :
                                tab === 'new' ? recentMaps :
                                    tab === 'private' ? privateMaps :
                                        []
                        } />
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
