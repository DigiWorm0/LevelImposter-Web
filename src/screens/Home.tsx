import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                    <Col lg={6}>
                        <div style={{ margin: 80 }}>
                            <h2 style={{ marginTop: 30, textAlign: "center" }}>
                                Zero programming<br />experience required
                            </h2>
                            <h5 style={{ lineHeight: 2 }}>
                                ✏️ Easy-to-use <a href="https://editor.levelimposter.net/">editing studio</a> built with React<br />
                                🖼️ Include your own custom sprites / images<br />
                                🔧 Add any task, sabotage, vent, or utility<br />
                                🚀 Deploy to others using <Link to="/maps">LevelImposter API</Link><br />
                                👋 Join the community of other map makers<br />
                                ⌨️ Completly open source under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3.0</a><br />
                            </h5>
                        </div>
                    </Col>

                    <Col lg={6}>
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
