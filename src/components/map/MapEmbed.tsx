import React from 'react';
import GUID from "../../types/GUID";

export interface MapEmbedProps {
    id: GUID;
}

export default function MapEmbed(props: MapEmbedProps) {
    return (
        <iframe
            src={`https://editor.levelimposter.net/?id=${props.id}&embed`}
            className={"w-100 rounded"}
            style={{ aspectRatio: "1" }}
            title={"Editor Embed"}
        />
    );
}