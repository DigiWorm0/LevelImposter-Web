import { Badge } from "react-bootstrap";

export default function MapTags(props: { isPublic: boolean, isVerified: boolean }) {
    return (
        <div style={{ marginBottom: 10 }}>
            {props.isPublic ? (
                null
            ) : (
                <Badge pill bg="danger">Private</Badge>
            )}
            {props.isVerified ? (
                <Badge pill bg="warning">Verified</Badge>
            ) : (
                null
            )}
        </div>
    );
}