import { Button } from "react-bootstrap";
import { CupHotFill } from "react-bootstrap-icons";

export default function KoFiButton() {
    return (
        <>
            <Button
                href="https://ko-fi.com/DigiWorm"
                target="_blank"
                variant="danger"
                size="sm"
            >
                <CupHotFill className={"mb-1 me-2"} />
                Sponsor me on Ko-fi
            </Button>
        </>
    );
}