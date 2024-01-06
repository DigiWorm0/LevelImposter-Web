import { Spinner } from "react-bootstrap";
import React from "react";

export default function PageLoadingSpinner() {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Spinner animation="border" />
        </div>
    )
}