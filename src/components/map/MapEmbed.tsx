import React from 'react';
import GUID from "../../types/GUID";

export default function MapEmbed(props: { id: GUID }) {
    const [isMouseOver, setIsMouseOver] = React.useState(false);

    React.useEffect(() => {
        document.body.style.overflow = isMouseOver ? "hidden" : "revert";
    }, [isMouseOver]);

    return (
        <iframe
            src={`https://editor.levelimposter.net/?id=${props.id}&embed`}
            style={{ width: '100%', aspectRatio: "1", borderRadius: 10 }}
            title={"Editor Embed"}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        />
    );
}