import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapDeleteBtn from '../components/map/MapDeleteBtn';
import MapDownloadBtn from '../components/map/MapDownloadBtn';
import MapTags from '../components/map/MapTags';
import { useMap } from '../hooks/useMaps';

export default function Map() {
    const { id } = useParams();
    const map = useMap(id);

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps">
                <Row>
                    <Col xs={6} style={{ padding: 10 }}>
                        <iframe
                            src={`https://editor.levelimposter.net/?id=${id}&embed`}
                            style={{ width: '100%', aspectRatio: "1", borderRadius: 10 }}
                            title={"Editor Embed"} />
                    </Col>
                    <Col xs={6} style={{ padding: 30 }}>
                        {map ? (
                            <>
                                <MapTags
                                    isPublic={map.isPublic}
                                    isVerified={map.isVerified}
                                />
                                <h1>{map.name}</h1>
                                <h5>by {map.authorName}</h5>
                                <p>{map.description}</p>
                                <MapDownloadBtn id={map.id} authorID={map.authorID} />
                                <br />
                                <MapDeleteBtn id={map.id} authorID={map.authorID} />
                            </>
                        ) : (
                            map === undefined ?
                                (
                                    <>
                                        <Spinner animation="border" />
                                    </>
                                ) : (
                                    <Navigate to="/404" replace />
                                )
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
