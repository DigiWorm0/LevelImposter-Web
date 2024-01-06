import { Col, Container, Row } from "react-bootstrap";
import DiscordEmbed from "../common/DiscordEmbed";

export default function HomeDiscordBanner() {
    return (
        <Container>
            <Row>
                <Col lg={12} className={"text-center p-5"}>
                    <h2 className={"fw-bold"}>
                        Join the Community
                    </h2>
                    <h6 className="text-muted mb-4">
                        Join our Discord server to get the latest news, ask questions, and share your maps.
                    </h6>
                    <DiscordEmbed />
                </Col>
            </Row>
        </Container>
    )
}