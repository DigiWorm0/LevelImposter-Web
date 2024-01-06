import TagType from "../../types/TagType";
import { Badge } from "react-bootstrap";
import { Variant } from "react-bootstrap/types";

export interface DisplayTagProps {
    type: TagType;
}

const TAG_VARIANTS: Record<TagType, Variant> = {
    [TagType.Admin]: "primary",
    [TagType.Creator]: "primary",
    [TagType.Banned]: "danger",
    [TagType.Unverified]: "secondary",

    [TagType.Private]: "danger",
    [TagType.Featured]: "warning",
    [TagType.Removed]: "danger",
};

export default function DisplayTag(props: DisplayTagProps) {
    return (
        <Badge
            className={"m-1"}
            pill
            bg={TAG_VARIANTS[props.type]}
        >
            {props.type}
        </Badge>
    )
}