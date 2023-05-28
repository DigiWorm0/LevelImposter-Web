import React from 'react';
import { Link } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapTags from "./MapTags";

export default function MapBanner(props: { map: LIMetadata }) {
    const [isHovering, setIsHovering] = React.useState(false);

    return (
        <Link
            to={`/map/${props.map.id}`}
            className={"list-group-item list-group-item-action bg-dark text-light"}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                transform: isHovering ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s ease-in-out",
            }}
        >
            <MapTags
                isPublic={props.map.isPublic}
                isVerified={props.map.isVerified}
            />
            <h4>
                <b>{props.map.name}</b>
            </h4>
            <h6>
                by {props.map.authorName}
            </h6>
            <p
                className="text-muted"
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {props.map.description === "" ? <i>No Description</i> : props.map.description}
            </p>
        </Link>
    );
}