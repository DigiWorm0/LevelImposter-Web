import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Shuffle } from 'react-bootstrap-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import MapDeleteBtn from '../components/map/MapDeleteBtn';
import MapDownloadBtn from '../components/map/MapDownloadBtn';
import MapEmbed from '../components/map/MapEmbed';
import MapLikeBtn from '../components/map/MapLikeBtn';
import MapPrivateButton from '../components/map/MapPrivateButton';
import MapVerifyButton from '../components/map/MapVerifyButton';
import getTimeAgoString from '../hooks/utils/getTimeAgoString';
import useMap from '../hooks/useMap';
import DisplayTag from "../components/common/DisplayTag";
import TagType from "../types/TagType";
import PageLoadingSpinner from "../components/common/PageLoadingSpinner";
import FormattedText from "../components/common/FormattedText";
import MapInstallInstructions from "../components/map/MapInstallInstructions";
import MapLink from "../components/map/MapLink";


export default function Map() {
    const { id } = useParams();
    const map = useMap(id);
    const navigate = useNavigate();

    if (map === null) {
        navigate('404');
        return null;
    }

    return (
        <>
            <LIHelmet
                title={map?.name}
                description={map?.description}
                URL={`https://LevelImposter.net/#/Map/${map?.id}`}
                imageURL={map?.thumbnailURL}
            />
            <MainHeader />

            {/* Loading Spinner */}
            {map === undefined && <PageLoadingSpinner />}

            {map && (
                <Container>
                    <Row className="mt-2">
                        <Col xs={12}>

                            {/* Remix Header */}
                            {map?.remixOf && (
                                <Alert
                                    className='d-flex align-items-center'
                                    variant="primary"
                                >
                                    <Shuffle
                                        size={20}
                                        className={"me-2"}
                                    />
                                    <div>
                                        This map is a remix of
                                        {' '}
                                        <MapLink mapID={map.remixOf} includeAuthor />
                                    </div>
                                </Alert>
                            )}

                            {/* Removal Header */}
                            {map.removalReason && (
                                <Alert variant="danger">
                                    Map was made private due to a violation of the
                                    {' '}
                                    <Link to="/policy">Site Policy</Link>
                                    <br />
                                    "{map.removalReason}"
                                </Alert>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        {/* Embed */}
                        <Col sm={6}>
                            <MapEmbed id={map.id} />
                        </Col>

                        {/* Details */}
                        <Col sm={6}>
                            {map.isVerified && <DisplayTag type={TagType.Featured} />}
                            {!map.isPublic && <DisplayTag type={TagType.Private} />}

                            <div className={"d-flex justify-content-between align-items-start"}>
                                <h1 className={"fw-bold"}>{map.name}</h1>
                                <MapLikeBtn id={id} likeCount={map?.likeCount ?? 0} />
                            </div>

                            <Link
                                to={`/User/${map.authorID}`}
                                style={{ textDecoration: "none" }}
                            >
                                <h5>by {map.authorName}</h5>
                            </Link>
                            <p className={"text-muted"}>
                                Last updated {getTimeAgoString(map.createdAt)}
                            </p>
                            <FormattedText text={map.description} />
                            <div className={"d-flex justify-content-between flex-wrap mt-3"}>
                                <MapDownloadBtn id={map.id} authorID={map.authorID} downloadCount={map.downloadCount} />
                                <MapDeleteBtn id={map.id} authorID={map.authorID} />
                                <MapVerifyButton id={map.id} isVerified={map.isVerified} isPublic={map.isPublic} />
                                <MapPrivateButton id={map.id} isPublic={map.isPublic} />
                            </div>

                            <MapInstallInstructions mapName={map.name} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}
