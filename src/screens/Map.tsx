import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Linkify from 'react-linkify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import MapDeleteBtn from '../components/map/MapDeleteBtn';
import MapDownloadBtn from '../components/map/MapDownloadBtn';
import MapEmbed from '../components/map/MapEmbed';
import MapLikeBtn from '../components/map/MapLikeBtn';
import MapPrivateButton from '../components/map/MapPrivateButton';
import MapTags from '../components/map/MapTags';
import MapVerifyButton from '../components/map/MapVerifyButton';
import getTimeAgoString from '../hooks/getTimeAgoString';
import { useMap } from '../hooks/useMaps';

export default function Map() {
    const { id } = useParams();
    const map = useMap(id);
    const navigate = useNavigate();

    const likeCount = map?.likeCount ?? 0;

    if (map === null) {
        navigate('404');
        return null;
    }
    else if (map === undefined) {
        return (
            <>
                <MainHeader />
                <BetaHeader />
                <Spinner animation="border" />
            </>
        );
    }

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Maps">
                {map.removalReason && (
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={12}>
                            <Alert
                                style={{ margin: 10 }}
                                variant="danger">

                                Map was made private due to a violation of the <Link to="/policy">Mapping Policy</Link>:
                                <br />
                                {map.removalReason}

                            </Alert>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col sm={6} style={{ padding: 10 }}>
                        <MapEmbed id={map.id} />
                    </Col>
                    <Col sm={6} style={{ padding: 30 }}>
                        <MapTags
                            isPublic={map.isPublic}
                            isVerified={map.isVerified}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1>{map.name}</h1>
                            <MapLikeBtn id={id} likeCount={likeCount} />
                        </div>
                        <Link
                            to={`/User/${map.authorID}`}
                            style={{ textDecoration: "none" }}>
                            <h5>by {map.authorName}</h5>
                        </Link>
                        <Linkify>
                            <p style={{ whiteSpace: "pre-wrap" }}>
                                {map.description}
                            </p>
                        </Linkify>
                        <p style={{ fontSize: "0.8em" }}>
                            Last updated {getTimeAgoString(map.createdAt)}
                        </p>
                        <MapVerifyButton id={map.id} isVerified={map.isVerified} isPublic={map.isPublic} />
                        <MapPrivateButton id={map.id} isPublic={map.isPublic} />
                        <MapDownloadBtn id={map.id} authorID={map.authorID} />
                        <MapDeleteBtn id={map.id} authorID={map.authorID} />

                        <Card>
                            <Card.Header>
                                How to Install
                            </Card.Header>
                            <Card.Body>
                                <ol>
                                    <li>
                                        Download and install the <a href="https://github.com/DigiWorm0/LevelImposter/releases">LevelImposter Mod</a> <i>(If you haven't already)</i>
                                    </li>
                                    <li>
                                        Download the map LIM file above
                                    </li>
                                    <li>
                                        Open Among Us
                                    </li>
                                    <li>
                                        Go to <code>Maps {'>>>'} Open Folder</code>
                                    </li>
                                    <li>
                                        Save the map LIM file in the folder
                                    </li>
                                    <li>
                                        Go back to Among Us and re-open the Maps menu
                                    </li>
                                </ol>
                            </Card.Body>
                        </Card>
                        <Card style={{ marginTop: 10 }}>
                            <Card.Header>
                                How to Play
                            </Card.Header>
                            <Card.Body>
                                <p>Freeplay</p>
                                <ol>
                                    <li>
                                        Open Among Us
                                    </li>
                                    <li>
                                        Go to <code>Maps {'>>>'} {map.name}</code>
                                    </li>
                                    <li>
                                        Select the map's play button
                                    </li>
                                </ol>
                                <p>Multiplayer</p>
                                <ol>
                                    <li>
                                        Start an Among Us lobby under any map
                                    </li>
                                    <li>
                                        Open lobby settings
                                    </li>
                                    <li>
                                        Select the map from the selector
                                    </li>
                                </ol>
                                <p>
                                    All players must have the LevelImposter mod installed to play the map.
                                    The map will automatically sync to all lobby members.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
