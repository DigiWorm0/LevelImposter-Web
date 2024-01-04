import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Check, CloudDownloadFill, HeartFill, Shuffle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useMap from "../../hooks/useMap";
import LIMetadata from "../../types/LIMetadata";
import MapDownloadBtn from "./MapDownloadBtn";
import MapThumbnailPlaceholder from "./MapThumbnailPlaceholder";
import getTimeAgoString from "../../hooks/utils/getTimeAgoString";

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

    const isHidden = map?.remixOf || !map?.isPublic;

    // Placeholder Thumbnail
    if (!map)
        return (<MapThumbnailPlaceholder />);

    return (
        <Card
            className={"bg-dark text-light border-0"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                minWidth: 350,
                maxWidth: 360,
                color: "inherit",
                transition: "transform 0.2s ease-in-out",
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                opacity: isHidden ? 0.6 : 1,
            }}
        >
            {/*  Remix Header  */}
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

            <Link to={`/map/${map.id}`}>

                {/*  Thumbnail  */}
                <Card.Img
                    variant={"top"}
                    src={thumbnailURL}
                    style={{
                        filter: isHidden ? "grayscale(50%)" : "none",
                    }}
                />

                {/*  Badges  */}
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        zIndex: 1
                    }}
                >
                    {!map.isPublic && (
                        <Badge pill bg="danger">Private</Badge>
                    )}
                    {map.removalReason && (
                        <Badge pill bg="danger" className="ms-1">Removed</Badge>
                    )}
                </div>
            </Link>
            <Card.Body>

                {/*  Verified Check  */}
                {map.isVerified && (
                    <Check
                        size={20}
                        color={"#bbb"}
                        className={"float-end"}
                    />
                )}

                {map.remixOf && (
                    <Shuffle
                        size={20}
                        color={"#bbb"}
                        className={"float-end"}
                    />
                )}

                {/*  Title  */}
                <Card.Title style={ellipseStyle}>
                    {map.name}
                </Card.Title>

                {/*  Author  */}
                <Card.Subtitle style={{ fontSize: 13 }} className={"text-muted"}>
                    by <Link to={`/user/${map.authorID}`}>{map.authorName}</Link>
                    {' · '}
                    {getTimeAgoString(map.createdAt)}
                </Card.Subtitle>

                {/*  Footer  */}
                <div className="d-flex justify-content-around mt-2">
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
                            {map.likeCount?.toLocaleString() ?? 0}
                        </small>
                        <small className="text-muted mt-3 ms-3">
                            <CloudDownloadFill
                                style={{ marginRight: 3 }}
                                size={14}
                            />
                            {map.downloadCount?.toLocaleString() ?? 0}
                        </small>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}