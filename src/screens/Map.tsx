import React from 'react';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Shuffle } from 'react-bootstrap-icons';
import Linkify from 'react-linkify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LIHelment from '../components/LIHelmet';
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

const MAX_LENGTH = 500;

export default function Map() {
    const { id } = useParams();
    const map = useMap(id);
    const remixOf = useMap(map?.remixOf);
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const likeCount = map?.likeCount ?? 0;
    const isExpandable = (map?.description?.length || "") > MAX_LENGTH;

    if (map === null) {
        navigate('404');
        return null;
    }

    return (
        <>
            <LIHelment
                title={map?.name}
                description={map?.description}
                URL={`https://LevelImposter.net/#/Map/${map?.id}`}
                imageURL={map?.thumbnailURL}
            />
            <MainHeader />
            {map === undefined && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <Spinner animation="border" />
                </div>
            )}
            {map !== undefined && (
                <Container className="Maps">
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={12}>
                            {remixOf && (
                                <Alert
                                    data-bs-theme="dark"
                                    className='d-flex align-items-center'
                                    variant="primary">
                                    <Shuffle
                                        size={20}
                                        style={{ marginRight: 10 }}
                                    />
                                    <div>
                                        This map is a remix of <Link to={`/Map/${map.remixOf}`}>{remixOf?.name}</Link> by <Link to={`/User/${remixOf?.authorID}`}>{remixOf?.authorName}</Link>
                                    </div>
                                </Alert>
                            )}
                            {map.removalReason && (
                                <Alert
                                    variant="danger">
                                    Map was made private due to a violation of the <Link to="/policy">Mapping Policy</Link>:
                                    <br />
                                    {map.removalReason}
                                </Alert>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} style={{ padding: 10 }}>
                            <MapEmbed id={map.id} />
                        </Col>
                        <Col sm={6} style={{ paddingLeft: 30 }}>
                            <MapTags
                                isPublic={map.isPublic}
                                isVerified={map.isVerified}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>
                                    <b>{map.name}</b>
                                </h1>
                                <MapLikeBtn id={id} likeCount={likeCount} />
                            </div>
                            <Link
                                to={`/User/${map.authorID}`}
                                style={{ textDecoration: "none" }}>
                                <h5>by {map.authorName}</h5>
                            </Link>
                            <Linkify>
                                <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
                                    {isExpandable && !isExpanded
                                        ? map.description?.substring(0, MAX_LENGTH) + "..."
                                        : map.description}
                                </p>
                            </Linkify>
                            {isExpandable && (
                                <Button
                                    variant="link"
                                    onClick={() => setIsExpanded(!isExpanded)}>
                                    {isExpanded ? "Show Less" : "Show More"}
                                </Button>
                            )}
                            <p style={{ fontSize: "0.8em", marginTop: 10 }}>
                                Last updated {getTimeAgoString(map.createdAt)}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', paddingBottom: 8 }}>
                                <MapDownloadBtn id={map.id} authorID={map.authorID} />
                                <MapDeleteBtn id={map.id} authorID={map.authorID} />
                                <MapVerifyButton id={map.id} isVerified={map.isVerified} isPublic={map.isPublic} />
                                <MapPrivateButton id={map.id} isPublic={map.isPublic} />
                            </div>

                            <Card className={"bg-dark text-white"}>
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
                            <Card className={"bg-dark text-white"} style={{ marginTop: 10 }}>
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
            )}
        </>
    );
}
