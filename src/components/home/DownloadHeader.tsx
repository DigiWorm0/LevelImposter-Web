import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import GHRelease from '../../types/GHRelease';

export default function DownloadHeader() {
    const [releases, setReleases] = React.useState<GHRelease[]>([]);

    React.useEffect(() => {
        fetch('https://api.github.com/repos/DigiWorm0/LevelImposter/releases')
            .then(response => response.json())
            .then(releases => {
                setReleases(releases);
            });
    }, []);

    const isLoaded = releases.length > 0;
    const downloadCount = isLoaded ? releases.reduce((acc, release) => {
        return acc + release.assets.reduce((acc, asset) => {
            return acc + asset.download_count;
        }, 0);
    }, 0) : 0;
    const downloadLink = isLoaded ? releases[0].html_url : "https://github.com/DigiWorm0/LevelImposter/releases";

    return (
        <Container style={{
            overflowY: "hidden",
            height: 600
        }}>
            <Row>
                <Col
                    style={{
                        paddingTop: 80,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>

                    <h1 style={{ fontWeight: "bold" }}>
                        The Only Among Us Mapping Studio
                    </h1>
                    <p className="text-muted">
                        Built for Makers, not Modders
                    </p>

                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <Button
                            variant="primary"
                            size="lg"
                            href={downloadLink}
                            style={{ margin: 5 }}>
                            Download Mod {releases[0]?.tag_name.split("-")[0]}
                        </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            href="https://editor.levelimposter.net/"
                            style={{ margin: 5 }}>
                            Launch Editor
                        </Button>
                    </div>

                    <p className="text-muted" style={{ marginTop: 20 }}>
                        <b>{downloadCount.toLocaleString()}</b> downloads
                    </p>

                </Col>

            </Row>
            <Row>
                <Col
                    style={{
                        paddingTop: 30,
                        textAlign: "center",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <img alt="screenshot" src="/editor-3.png" style={{ width: "70%", borderRadius: 10 }} />
                </Col>
            </Row>
        </Container>
    );
}
