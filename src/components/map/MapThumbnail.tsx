import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapDownloadBtn from "./MapDownloadBtn";

export default function MapThumbnail(props: { map: LIMetadata }) {
    const [isHovered, setIsHovered] = React.useState(false);

    const map = props.map;
    const thumbnailURL = map.thumbnailURL ? map.thumbnailURL : "/DefaultThumbnail.png";
    const ellipseStyle: React.CSSProperties = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    };

    return (
        <Link
            to={`/map/${map.id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s ease-in-out",
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)"
            }}
        >
            <Card
                style={{ width: 350 }}
                className={"bg-dark text-light"}>

                <Card.Img variant="top" src={thumbnailURL} />
                <Card.Body>
                    <Card.Title style={ellipseStyle}>
                        {map.name}
                    </Card.Title>
                    <Card.Subtitle style={ellipseStyle}>
                        by <Link to={`/user/${map.authorID}`}>{map.authorName}</Link>
                    </Card.Subtitle>
                    <Card.Text style={ellipseStyle} className={"text-muted"}>
                        {map.description || (<i>No Description</i>)}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <MapDownloadBtn id={map.id} authorID={map.authorID} />
                        <small className="text-muted mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                            <span style={{ marginLeft: 3 }}>{map.likeCount ? map.likeCount.toLocaleString() : 0}</span>
                        </small>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
}