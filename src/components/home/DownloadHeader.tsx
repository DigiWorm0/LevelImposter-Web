import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import GHRelease from '../../types/GHRelease';

const RELEASE_COUNT = 100;
const API_URL = `https://api.github.com/repos/DigiWorm0/LevelImposter/releases?per_page=${RELEASE_COUNT}`;
const DOWNLOAD_LINK = "https://github.com/DigiWorm0/LevelImposter/releases";

export default function DownloadHeader() {
    const [releases, setReleases] = React.useState<GHRelease[]>([]);

    React.useEffect(() => {
        fetch(API_URL)
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
    const downloadLink = isLoaded ? releases[0].html_url : DOWNLOAD_LINK;

    return (
        <Container>
            <Row>
                <Col
                    style={{
                        paddingTop: 80,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h1 className="fw-bold">
                        Custom Maps for Among Us
                    </h1>
                    <p className="text-muted">
                        Editor Tool &middot; Among Us Mod &middot; Community Workshop
                    </p>

                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <Button
                            variant="primary"
                            size="lg"
                            href={downloadLink}
                            style={{ margin: 5 }}
                        >
                            Download Mod
                        </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            href="https://editor.levelimposter.net/"
                            style={{ margin: 5 }}
                        >
                            Map Editor
                        </Button>
                    </div>
                    <p className="text-muted mt-3">
                        <b>{downloadCount.toLocaleString()}</b> downloads
                    </p>
                </Col>
            </Row>
            <Row>
                <Col
                    sm={{ span: 8, offset: 2 }}
                    style={{
                        paddingTop: 30,
                        textAlign: "center",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <img
                        alt=""
                        src="/editor-3.png"
                        style={{
                            width: "100%",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}
