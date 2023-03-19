import { Col, Container, Row } from 'react-bootstrap';

export default function BetaHeader() {
    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgb(15, 17, 19)",
                color: "#fff"
            }}>

            <Row>
                <Col
                    style={{
                        paddingTop: 15,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <p><b>Note:</b> LevelImposter is in early access and subject to frequent changes.</p>
                </Col>
            </Row>
        </Container>
    );
}