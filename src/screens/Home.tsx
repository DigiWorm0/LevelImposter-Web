import { Col, Container, Row } from 'react-bootstrap';
import { Book, CodeSlash, Github } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import DownloadHeader from '../components/home/DownloadHeader';
import LIHelment from '../components/LIHelmet';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';

export default function Home() {
    return (
        <>
            <LIHelment />
            <MainHeader>
                <DownloadHeader />
            </MainHeader>

            <Container>
                <Row style={{ paddingTop: 90, paddingRight: 50 }}>

                    <Col lg={4} style={{ justifyContent: "center", alignItems: "flex-end", display: "flex", flexDirection: "column", paddingRight: 50 }}>
                        <CodeSlash size={128} />
                    </Col>
                    <Col lg={5}>
                        <h2>
                            <b>Zero Programming Required</b>
                        </h2>
                        <h6 className="text-muted">
                            All tasks, sabotages, and utilities can be configured directly in the editor.
                            Maps are exported as a single file that can be launched directly from the mod.
                        </h6>
                        <a
                            href="https://editor.levelimposter.net/"
                            className="btn btn-primary"
                            style={{ marginTop: 20 }}
                        >
                            Launch Editor
                        </a>
                    </Col>
                </Row>
                <Row style={{ paddingTop: 90, paddingLeft: 50 }}>
                    <Col lg={{ span: 5, offset: 2 }}>
                        <h2>
                            <b>Map Library & API</b>
                        </h2>
                        <h6 className="text-muted">
                            Our library of maps is growing every day.
                            You can download maps directly from the game, or browse the library on our website.
                            You can also create your own maps using our editor and share them with the community.
                        </h6>
                        <Link to="/maps" className="btn btn-danger" style={{ marginTop: 20 }}>
                            Browse Maps
                        </Link>
                    </Col>
                    <Col lg={4} style={{ justifyContent: "center", alignItems: "flex-start", display: "flex", flexDirection: "column", paddingLeft: 50 }}>
                        <Book size={128} />
                    </Col>
                </Row>
                <Row style={{ paddingTop: 90, paddingRight: 50 }}>
                    <Col lg={4} style={{ justifyContent: "center", alignItems: "flex-end", display: "flex", flexDirection: "column", paddingRight: 50 }}>
                        <Github size={128} />
                    </Col>
                    <Col lg={5}>
                        <h2>
                            <b>Open Source</b>
                        </h2>
                        <h6 className="text-muted">
                            Everything you see is open source under GNU GPL v3.
                            You can contribute to any of our projects on GitHub to create your own custom features.
                        </h6>
                        <a
                            href="https://github.com/DigiWorm0/LevelImposter"
                            className="btn btn-primary"
                            style={{ marginTop: 20 }}
                        >
                            View on GitHub
                        </a>
                    </Col>
                </Row>
                <Row style={{ paddingTop: 90, paddingBottom: 90, textAlign: "center" }}>
                    <Col lg={12}>
                        <h2>
                            <b>Join the Community</b>
                        </h2>
                        <h6 className="text-muted">
                            Join our Discord server to get the latest news, ask questions, and share your maps.
                        </h6>
                        <iframe
                            title={"Discord"}
                            src="https://discord.com/widget?id=830091888332767253&theme=dark"
                            height={500}
                            className="discord"
                            allowTransparency={true}
                            frameBorder={0}
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                            style={{ flex: 1, width: "70%", marginTop: 20 }} />
                    </Col>
                </Row>
            </Container>
            <MainFooter />
        </>
    );
}
