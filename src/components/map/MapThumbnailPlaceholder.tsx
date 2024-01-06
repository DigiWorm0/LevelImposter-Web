import { Card, Placeholder, PlaceholderButton } from "react-bootstrap";
import React from "react";

export default function MapThumbnailPlaceholder() {
    return (
        <Placeholder
            style={{
                borderRadius: 10,
            }}
        >
            <Card
                style={{ minWidth: 350, maxWidth: 360 }}
                className={"bg-dark text-light"}
            >
                <Card.Img
                    variant="top"
                    src={"/DefaultThumbnail.png"}
                />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Subtitle} animation="glow">
                        <Placeholder xs={7} />
                    </Placeholder>
                    <div className="d-flex justify-content-between mt-2">
                        <PlaceholderButton variant="primary" size="sm" xs={6}>
                            <Placeholder xs={9} />
                        </PlaceholderButton>
                    </div>
                </Card.Body>
            </Card>
        </Placeholder>
    )
}