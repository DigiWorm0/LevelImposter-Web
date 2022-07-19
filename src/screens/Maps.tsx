import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapThumbnail from '../components/map/MapThumbnail';
import useMaps from '../hooks/useMaps';
import LIMetadata from '../types/LIMetadata';

export default function Maps() {
    const mapList = useMaps();
    const [verifiedMaps, setVerifiedMaps] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        const verifiedMapList = mapList.filter((map) => map.isVerified);
        setVerifiedMaps(verifiedMapList);
    }, [mapList]);

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps" style={{ padding: 30 }}>
                <Row>
                    <Col>
                        <h3 style={{ textAlign: "center" }}>Recent Uploads</h3>
                        <ListGroup>
                            {mapList.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    id={map.id}
                                    name={map.name}
                                    authorName={map.authorName}
                                    description={map.description}
                                    isVerified={map.isVerified}
                                    isPublic={map.isPublic}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col>
                        <h3 style={{ textAlign: "center" }}>Verified Maps</h3>
                        <ListGroup>
                            {verifiedMaps.map((map) => (
                                <MapThumbnail
                                    key={map.id}
                                    id={map.id}
                                    name={map.name}
                                    authorName={map.authorName}
                                    description={map.description}
                                    isVerified={map.isVerified}
                                    isPublic={map.isPublic}
                                />
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
