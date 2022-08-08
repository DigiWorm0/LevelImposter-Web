import { Col, Container, Row } from 'react-bootstrap';
import KoFi from './home/KoFi';

export default function MainFooter() {
    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgb(33, 37, 41)",
                color: "#fff"
            }}>
            <Row>
                <Col
                    style={{
                        padding: 15,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <p style={{ margin: 0 }}>
                        Made with ❤️ by DigiWorm
                    </p>
                    <div style={{ marginTop: 5 }}>
                        <KoFi />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
