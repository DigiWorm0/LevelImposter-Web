import { Button, Col, Container, Row } from 'react-bootstrap';

export default function DownloadHeader() {
    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgb(24, 27, 30)",
                color: "#fff"
            }}>

            <Row>

                <Col
                    sm={{ span: 5, offset: 1 }}
                    style={{
                        padding: 50,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>

                    <h4>The only Among Us</h4>
                    <h1>Mapping Studio</h1>
                    <p>Free. Open Source. Forever.</p>

                    <Button
                        variant="primary"
                        size="lg"
                        href="https://github.com/DigiWorm0/LevelImposter/releases"
                        style={{ margin: 5 }}>
                        Download Mod
                    </Button>
                    <Button
                        variant="danger"
                        size="lg"
                        href="https://editor.levelimposter.net/"
                        style={{ margin: 5 }}>
                        Launch Editor
                    </Button>

                </Col>

                <Col
                    sm={{ span: 5, offset: 1 }}
                    style={{
                        padding: 20,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <img alt="screenshot" src="/editor-1.png" style={{ width: "100%" }} />
                </Col>
            </Row>
        </Container>
    );
}
