import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import DownloadHeader from '../components/home/DownloadHeader';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';

export default function Home() {
    return (
        <>
            <MainHeader />
            <DownloadHeader />

            <Container className="Home">
                <Row>
                    <Col xs={6}>
                        <div style={{ margin: 80 }}>
                            <h2 style={{ marginTop: 30, textAlign: "center" }}>
                                Built for creators, <br />not modders.
                            </h2>
                            <h5 style={{ lineHeight: 2 }}>
                                ✏️ Easy-to-use editing studio <i>(now with dark mode!)</i><br />
                                ⌨️ No programming required<br />
                                🖼️ Include custom sprites / images<br />
                                🔧 Include any task, vent, or utility<br />
                                🚀 Deploy to any LevelImposter user<br />
                            </h5>
                        </div>
                    </Col>

                    <Col xs={{ span: 6 }}>
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

            <MainFooter />
        </>
    );
}
