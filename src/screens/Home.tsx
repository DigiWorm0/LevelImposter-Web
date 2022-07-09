import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import HomeHeader from '../components/home/HomeHeader';

export default function Home() {
    return (
        <Container fluid className="Home">
            <HomeHeader />
            <Row>
                <Col xs={{ span: 4, offset: 2 }}>
                    <div style={{ textAlign: "center" }}>
                        <h4 style={{ marginTop: 30 }}>
                            We are the world's only custom map making studio for Among Us.
                        </h4>
                        <ul style={{ listStyleType: "none" }}>
                            <li>
                                ✏️ Easy-to-use editing studio <i>(now with dark mode!)</i>
                            </li>
                            <li>
                                🖼️ Import custom sprites / images
                            </li>
                            <li>
                                🔧 Include any task, vent, or utility
                            </li>
                            <li>
                                🚀 Deploy to any LevelImposter user
                            </li>
                            <li>
                                🤝 Works with other Among Us mods
                            </li>
                        </ul>

                        <h4 style={{ marginTop: 30 }}>
                            How do I get started?
                        </h4>
                        <p style={{ marginBottom: 5 }}>
                            Players can download and install the Among Us mod:
                        </p>
                        <Button variant="danger" href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Button>
                        <p style={{ marginBottom: 5, marginTop: 5 }}>
                            Map makers can open the editing studio:
                        </p>
                        <Button href="https://editor.levelimposter.net/">Editor</Button>

                    </div>
                </Col>
                <Col xs={{ span: 4 }}>
                    <div style={{ margin: 15 }}>
                        <iframe
                            title={"Discord"}
                            src="https://discord.com/widget?id=830091888332767253&theme=dark"
                            height={500}
                            className="discord"
                            allowTransparency={true}
                            frameBorder={0}
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                            style={{ flex: 1, width: "100%" }} />
                    </div>
                </Col>
            </Row>

        </Container>
    );
}
