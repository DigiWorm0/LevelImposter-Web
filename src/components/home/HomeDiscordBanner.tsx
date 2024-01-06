import { Col, Container, Row } from "react-bootstrap";
import DiscordEmbed from "../common/DiscordEmbed";

export default function HomeDiscordBanner() {
    return (
        <Container>
            <Row style={{ paddingTop: 90, paddingBottom: 90, textAlign: "center" }}>
                <Col lg={12}>
                    <h2>
                        <b>Join the Community</b>
                    </h2>
                    <h6 className="text-muted">
                        Join our Discord server to get the latest news, ask questions, and share your maps.
                    </h6>
                    <DiscordEmbed />
                </Col>
            </Row>
        </Container>
    )
}