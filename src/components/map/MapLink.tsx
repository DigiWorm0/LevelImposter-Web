import GUID from "../../types/GUID";
import useMap from "../../hooks/useMap";
import { Link } from "react-router-dom";
import React from "react";

export interface MapLinkProps {
    mapID: GUID;
    includeAuthor?: boolean;
}

export default function MapLink(props: MapLinkProps) {
    const map = useMap(props.mapID);

    // Handle loading state
    if (map === undefined)
        return (<span>...</span>);
    else if (map === null)
        return (<span className={"text-danger"}>deleted map</span>);
    
    return (
        <>
            <Link to={`/map/${map.id}`}>{map.name}</Link>
            {props.includeAuthor && (
                <>
                    {" "}
                    by <Link to={`/user/${map.authorID}`}>{map.authorName}</Link>
                </>
            )}
        </>
    );
}