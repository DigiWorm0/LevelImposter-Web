import React from 'react';
import GUID from "../../types/GUID";

export interface MapEmbedProps {
    id: GUID;
}

export default function MapEmbed(props: MapEmbedProps) {
    return (
        <iframe
            src={`https://editor.levelimposter.net/?id=${props.id}&embed`}
            style={{ width: '100%', aspectRatio: "1", borderRadius: 10 }}
            title={"Editor Embed"}
        />
    );
}