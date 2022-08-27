import { Link } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapTags from "./MapTags";

export default function MapBanner(props: { map: LIMetadata }) {
    const map = props.map;

    return (
        <Link
            to={`/map/${map.id}`}
            className={"list-group-item list-group-item-action" + (map.isPublic ? "" : " list-group-item-dark")}>
            <MapTags
                isPublic={map.isPublic}
                isVerified={map.isVerified}
            />
            <h4>{map.name}</h4>
            <h5>by {map.authorName}</h5>
            <p style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
                {map.description === "" ? <i>No Description</i> : map.description}
            </p>
        </Link>
    );
}