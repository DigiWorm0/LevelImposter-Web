import LIMetadata from "../../types/LIMetadata";
import MapThumbnail from "./MapThumbnail";

export default function MapBanners(props: { maps: LIMetadata[], scroll?: boolean }) {
    return (
        <div style={{
            display: "flex",
            marginTop: 20,
            marginBottom: 20,
            overflowX: props.scroll ? "scroll" : "revert",
            flexWrap: props.scroll ? "nowrap" : "wrap",
            justifyContent: props.scroll ? "flex-start" : "center",
            alignItems: props.scroll ? "flex-start" : "center",
            alignContent: props.scroll ? "flex-start" : "center",
            gap: 20,
            padding: 5
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