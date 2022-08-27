import GUID from "../../types/GUID";

export default function MapEmbed(props: { id: GUID }) {
    return (
        <iframe
            src={`https://editor.levelimposter.net/?id=${props.id}&embed`}
            style={{ width: '100%', aspectRatio: "1", borderRadius: 10 }}
            title={"Editor Embed"} />
    );
}