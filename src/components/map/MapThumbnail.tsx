import { Link } from "react-router-dom";
import GUID from "../../types/GUID";
import MapTags from "./MapTags";

export default function MapThumbnail(props: { id: GUID, name: string, authorName: string, description: string, isVerified: boolean, isPublic: boolean }) {
    return (
        <Link to={"/map/" + props.id} className="list-group-item list-group-item-action">
            <h4>{props.name}</h4>
            <h6>by {props.authorName}</h6>
            <p>{props.description === "" ? <i>No Description</i> : props.description}</p>
            <MapTags
                isPublic={props.isPublic}
                isVerified={props.isVerified}
            />
        </Link>
    );
}