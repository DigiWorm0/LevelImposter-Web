import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Check, CloudDownloadFill, HeartFill, Shuffle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapDownloadBtn from "./MapDownloadBtn";
import MapThumbnailPlaceholder from "./MapThumbnailPlaceholder";
import getTimeAgoString from "../../hooks/utils/getTimeAgoString";
import MapLink from "./MapLink";
import DisplayTag from "../common/DisplayTag";
import TagType from "../../types/TagType";

export default function MapThumbnail(props: { map: LIMetadata | undefined }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const map = props.map;
    const thumbnailURL = map?.thumbnailURL ? map.thumbnailURL : "/DefaultThumbnail.png";

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
                width: 350,
                color: "inherit",
                transition: "transform 0.2s ease-in-out",
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                opacity: isHidden ? 0.6 : 1,
            }}
        >
            {/*  Remix Header  */}
            {props.map?.remixOf && (
                <Card.Header className={"d-flex align-items-center justify-content-center"}>
                    <Shuffle
                        className={"me-2"}
                        size={14}
                    />
                    <span>
                        Remix of <MapLink mapID={props.map.remixOf} />
                    </span>
                </Card.Header>
            )}

            <Link to={`/map/${map.id}`} className={"position-relative"}>

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
                    {!map.isPublic && <DisplayTag type={TagType.Private} />}
                    {map.removalReason && <DisplayTag type={TagType.Removed} />}
                </div>
            </Link>
            <Card.Body>

                {/*  Verified Check  */}
                {map.isVerified && (
                    <OverlayTrigger
                        placement="top"
                        overlay={(props) => (
                            <Tooltip {...props}>Verified</Tooltip>
                        )}
                    >
                        <Check
                            size={20}
                            color={"#bbb"}
                            className={"float-end"}
                        />
                    </OverlayTrigger>
                )}

                {map.remixOf && (
                    <Shuffle
                        size={20}
                        color={"#bbb"}
                        className={"float-end"}
                    />
                )}

                {/*  Title  */}
                <Card.Title
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
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
                    <MapDownloadBtn
                        id={map.id}
                        authorID={map.authorID}
                        downloadCount={map.downloadCount}
                    />
                    <div className={"d-flex w-100 justify-content-end"}>
                        <small className="text-muted mt-3">
                            <HeartFill
                                className={"me-1"}
                                size={14}
                            />
                            {map.likeCount?.toLocaleString() ?? 0}
                        </small>
                        <small className="text-muted mt-3 ms-3">
                            <CloudDownloadFill
                                className={"me-1"}
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