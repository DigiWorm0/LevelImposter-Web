import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
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

    const getTimeAgoString = () => {
        const diff = new Date().getTime() - map.createdAt;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor(diff / 1000);

        if (days > 0)
            return `${days} day${days > 1 ? 's' : ''} ago`;
        else if (hours > 0)
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        else if (minutes > 0)
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        else if (seconds > 0)
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        else
            return 'just now';
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
                            Last updated {getTimeAgoString()}
                        </p>
                        <MapDownloadBtn id={map.id} authorID={map.authorID} />
                        <MapVerifyButton id={map.id} isVerified={map.isVerified} isPublic={map.isPublic} />
                        <MapPrivateButton id={map.id} isPublic={map.isPublic} />
                        <MapDeleteBtn id={map.id} authorID={map.authorID} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
