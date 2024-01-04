import { MaybeLIMetadata } from "../../types/LIMetadata";
import MapThumbnail from "./MapThumbnail";

export default function MapThumbnails(props: { maps: MaybeLIMetadata[], scroll?: boolean }) {
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
            {props.maps.map((map, index) => (
                <MapThumbnail
                    key={map?.id ?? index}
                    map={map}
                />
            ))}
            {props.scroll && <div style={{ width: 50, height: 20, flexShrink: 0 }} />}
        </div>
    )
}