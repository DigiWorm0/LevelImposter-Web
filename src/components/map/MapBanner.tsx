import { Link } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapTags from "./MapTags";

export default function MapBanner(props: { map: LIMetadata }) {
    const map = props.map;

    return (
        <Link
            to={`/map/${map.id}`}
            className={"list-group-item list-group-item-action bg-darker text-light"}>

            <MapTags
                isPublic={map.isPublic}
                isVerified={map.isVerified}
            />
            <h4>
                <b>{map.name}</b>
            </h4>
            <h6>
                by {map.authorName}
            </h6>
            <p className="text-muted" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
                {map.description === "" ? <i>No Description</i> : map.description}
            </p>
        </Link>
    );
}