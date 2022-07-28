import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LIMetadata from "../../types/LIMetadata";
import MapTags from "./MapTags";

export default function MapThumbnail(props: { map: LIMetadata }) {
    const map = props.map;
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(`/map/${map.id}`)}
            className="list-group-item list-group-item-action">
            <MapTags
                isPublic={map.isPublic}
                isVerified={map.isVerified}
            />
            <h4>{map.name}</h4>
            <h5>by {map.authorName}</h5>
            <p>{map.description === "" ? <i>No Description</i> : map.description}</p>
        </Button>
    );
}