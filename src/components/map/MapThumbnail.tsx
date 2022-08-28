import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import getTimeAgoString from "../../hooks/getTimeAgoString";
import { useThumbnail } from "../../hooks/useMaps";
import LIMetadata from "../../types/LIMetadata";
import MapDownloadBtn from "./MapDownloadBtn";

export default function MapThumbnail(props: { map: LIMetadata }) {
    const thumbnail = useThumbnail(props.map.authorID, props.map.id);

    const map = props.map;
    const thumbnailURL = thumbnail ? thumbnail : "/DefaultThumbnail.png";
    const ellipseStyle: React.CSSProperties = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    };

    return (
        <Link
            to={`/map/${map.id}`}
            style={{
                textDecoration: "none",
                color: "inherit"
            }}
        >
            <Card
                style={{ width: 350 }}
                className={map.isPublic ? "" : " bg-dark text-light"}>

                <Card.Img variant="top" src={thumbnailURL} />
                <Card.Body>
                    <Card.Title style={ellipseStyle}>{map.name}</Card.Title>
                    <Card.Subtitle style={ellipseStyle}>
                        by <Link to={`/user/${map.authorID}`}>{map.authorName}</Link>
                    </Card.Subtitle>
                    <Card.Text style={ellipseStyle}>
                        {map.description || (<i>No Description</i>)}
                    </Card.Text>
                    <MapDownloadBtn id={map.id} authorID={map.authorID} />
                    <br />
                    <small className="text-muted mt-3">
                        Last updated {getTimeAgoString(map.createdAt)}
                    </small>
                </Card.Body>
            </Card>
        </Link>
    );
}