import LIMetadata from "../../types/LIMetadata";
import MapThumbnail from "./MapThumbnail";

export default function MapBanners(props: { maps: LIMetadata[] }) {
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: 20,
            marginTop: 20,
            marginBottom: 20
        }}>
            {props.maps.map((map) => (
                <MapThumbnail
                    key={map.id}
                    map={map}
                />
            ))}
        </div>
    )
}