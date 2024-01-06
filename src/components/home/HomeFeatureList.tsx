import { Col, Container, Row } from "react-bootstrap";
import { Book, Github, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function HomeFeatureList() {
    return (
        <div
            style={{
                backgroundColor: "rgb(15, 17, 19)",
                padding: 40,
                paddingBottom: 70
            }}
        >
            <Container>
                <Row>
                    <Col
                        sm={{ span: 3, offset: 1 }}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 20
                        }}
                    >
                        <Book size={128} />
                    </Col>
                    <Col sm={5}>
                        <div style={{ margin: 10 }}>
                            <h2 style={{ marginTop: 50 }}>
                                <b>Map Workshop</b>
                            </h2>
                            <h6 className="text-muted">
                                Our library of maps is growing every day.
                                You can download maps directly from the game, or browse the library on our website.
                                You can also create your own maps using our editor and share them with the
                                community.
                            </h6>
                            <Link to="/maps" className="btn btn-primary" style={{ marginTop: 20 }}>
                                Browse Maps
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        sm={{ span: 3, order: "last" }}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 20
                        }}
                    >
                        <Pencil size={128} />
                    </Col>
                    <Col sm={{ span: 5, offset: 2, order: "first" }}>
                        <div style={{ margin: 10 }}>
                            <h2 style={{ marginTop: 50 }}>
                                <b>Online Editor</b>
                            </h2>
                            <h6 className="text-muted">
                                All tasks, sabotages, and utilities can be configured directly in the editor.
                                Maps are exported as a single file that can be launched directly from the mod.
                            </h6>
                            <a
                                href="https://editor.levelimposter.net/"
                                className="btn btn-danger"
                                style={{ marginTop: 20 }}
                            >
                                Launch Editor
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        sm={{ span: 3, offset: 1 }}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 20
                        }}
                    >
                        <Github size={128} />
                    </Col>
                    <Col sm={5}>

                        <div style={{ margin: 10 }}>
                            <h2 style={{ marginTop: 50 }}>
                                <b>Open Source</b>
                            </h2>
                            <h6 className="text-muted">
                                Everything you see is open source under GNU GPL v3.
                                You can contribute to any of our projects on GitHub to create your own custom
                                features.
                            </h6>
                            <a
                                href="https://github.com/DigiWorm0/LevelImposter"
                                className="btn btn-primary"
                                style={{ marginTop: 20 }}
                            >
                                View on GitHub
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}