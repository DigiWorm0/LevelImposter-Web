import LIMetadata from "../../types/LIMetadata";
import MapThumbnail from "./MapThumbnail";

const LOADING_MAPS_COUNT = 3 * 5;

export default function MapBanners(props: { maps: LIMetadata[], scroll?: boolean }) {
    return (
        <div style={{
            display: "flex",
            overflowX: props.scroll ? "auto" : "revert",
            flexWrap: props.scroll ? "nowrap" : "wrap",
            justifyContent: props.scroll ? "flex-start" : "center",
            alignItems: props.scroll ? "flex-start" : "center",
            alignContent: props.scroll ? "flex-start" : "center",
            paddingBottom: 20,
            paddingTop: 20,
            gap: 20
        }}
        >
            {props.scroll && <div style={{ width: 50, height: 20, flexShrink: 0 }} />}
            {props.maps.map((map) => (
                <MapThumbnail
                    key={map.id}
                    map={map}
                />
            ))}
            {props.maps.length <= 0 && Array(LOADING_MAPS_COUNT).fill(0).map((_, i) => (
                <MapThumbnail
                    key={i}
                    map={undefined}
                />
            ))}
            {props.scroll && <div style={{ width: 50, height: 20, flexShrink: 0 }} />}
        </div>
    )
}