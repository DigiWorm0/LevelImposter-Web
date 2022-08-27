import { Link } from "react-router-dom";
import { useThumbnail } from "../../hooks/useMaps";
import LIMetadata from "../../types/LIMetadata";
import MapTags from "./MapTags";

export default function MapThumbnail(props: { map: LIMetadata }) {
    const thumbnail = useThumbnail(props.map.authorID, props.map.id);
    const map = props.map;

    return (
        <Link
            to={`/map/${map.id}`}
            className={"list-group-item list-group-item-action" + (map.isPublic ? "" : " list-group-item-danger")}>

            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={map.name}
                    style={{ width: 412, height: 144, objectFit: "cover", margin: 10, borderRadius: 5 }}
                />
            )}

            <MapTags
                isPublic={map.isPublic}
                isVerified={map.isVerified}
            />
            <h4>{map.name}</h4>
            <h5>by {map.authorName}</h5>
            <p>
                {map.description === "" ? <i>No Description</i> : map.description}
            </p>
        </Link>
    );
}