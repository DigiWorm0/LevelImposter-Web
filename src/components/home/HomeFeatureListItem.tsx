import { Col, Container, Row } from "react-bootstrap";
import React from "react";

export interface HomeFeatureListItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    button: React.ReactNode;
}

export default function HomeFeatureListItem(props: HomeFeatureListItemProps) {
    return (
        <Container className={"mt-5 mb-5 pt-2 pb-1"} style={{ maxWidth: 1100 }}>
            <Row>
                <Col sm={4} className={"d-flex justify-content-center align-items-center"}>
                    {props.icon}
                </Col>
                <Col sm={7}>
                    <h2 className={"fw-bold"}>
                        {props.title}
                    </h2>
                    <h6 className="text-muted mb-4">
                        {props.description}
                    </h6>
                    {props.button}
                </Col>
            </Row>
        </Container>
    );
}