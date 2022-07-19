import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useMap } from "../../hooks/useMaps";
import GUID from "../../types/GUID";

export default function OpenAUButton(props: { id: GUID }) {
    const map = useMap(props.id);

    if (!map)
        return null;

    return (
        <OverlayTrigger
            placement='right'
            overlay={
                <Tooltip id='tooltip-right'>
                    <strong>Coming Soon</strong>
                </Tooltip>
            }>
            <div style={{ display: "inline" }}>
                <Button
                    variant="primary"
                    disabled
                    style={{ marginBottom: 10 }}
                    onClick={() => {
                        alert("To Be Implemented");
                    }}>
                    Launch in Among Us
                </Button>
            </div>
        </OverlayTrigger>
    );
}