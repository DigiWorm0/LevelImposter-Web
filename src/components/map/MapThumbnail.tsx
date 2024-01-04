import React from "react";
import { Card, Placeholder, PlaceholderButton } from "react-bootstrap";
import { HeartFill, Shuffle, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useMap from "../../hooks/useMap";
import LIMetadata from "../../types/LIMetadata";
import MapDownloadBtn from "./MapDownloadBtn";

export default function MapThumbnail(props: { map: LIMetadata | undefined }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const remixOf = useMap(props.map?.remixOf);
    const map = props.map;
    const thumbnailURL = map?.thumbnailURL ? map.thumbnailURL : "/DefaultThumbnail.png";
    const ellipseStyle: React.CSSProperties = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    };

    if (map) {

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
                    className={"bg-dark text-light border-0"}
                >
                    {remixOf && (
                        <Card.Header className={"d-flex align-items-center justify-content-center"}>
                            <Shuffle
                                style={{ marginRight: 5, minWidth: 14 }}
                                size={14}
                            />
                            <div>
                                Remix of <Link to={`/map/${remixOf.id}`}>{remixOf.name}</Link>
                            </div>
                        </Card.Header>
                    )}
                    {map.removalReason && (
                        <Card.Header
                            className={"d-flex align-items-center justify-content-center bg-danger text-light"}>
                            <TrashFill
                                style={{ marginRight: 5, minWidth: 14 }}
                                size={14}
                            />
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {map.removalReason}
                            </div>
                        </Card.Header>
                    )}
                    <Card.Img
                        variant={"top"}
                        src={thumbnailURL}
                        style={{
                            borderTopLeftRadius: map.removalReason || remixOf ? 0 : undefined,
                            borderTopRightRadius: map.removalReason || remixOf ? 0 : undefined
                        }}
                    />
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
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <small className="text-muted mt-3">
                                    <HeartFill
                                        style={{ marginRight: 3 }}
                                        size={14}
                                    />
                                    {map.likeCount ? map.likeCount.toLocaleString() : 0}
                                </small>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        );
    } else {
        return (
            <Placeholder
                style={{
                    borderRadius: 10,
                }}
            >
                <Card
                    style={{ width: 350 }}
                    className={"bg-dark text-light"}
                >
                    <Card.Img
                        variant="top"
                        src={thumbnailURL}
                    />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Subtitle} animation="glow">
                            <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} />
                        </Placeholder>
                        <div className="d-flex justify-content-between">
                            <PlaceholderButton variant="primary" size="sm" xs={6}>
                                <Placeholder xs={9} />
                            </PlaceholderButton>
                        </div>
                    </Card.Body>
                </Card>
            </Placeholder>
        );
    }
}