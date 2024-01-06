import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import GHRelease from '../../types/GHRelease';

const RELEASE_COUNT = 100;
const API_URL = `https://api.github.com/repos/DigiWorm0/LevelImposter/releases?per_page=${RELEASE_COUNT}`;
const DOWNLOAD_LINK = "https://github.com/DigiWorm0/LevelImposter/releases";

export default function HomeDownloadHeader() {
    const [releases, setReleases] = React.useState<GHRelease[]>([]);

    React.useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(releases => {
                setReleases(releases);
            });
    }, []);

    const downloadLink = releases.length > 0 ? releases[0].html_url : DOWNLOAD_LINK;
    const downloadCount = React.useMemo(() => {
        return releases.reduce((acc, release) => acc + release.assets.reduce((acc, asset) => acc + asset.download_count, 0), 0)
    }, [releases]);


    return (
        <Container>
            <Row>
                <Col className={"pt-5 mt-5 text-center d-flex justify-content-center align-items-center flex-column"}>
                    <h1 className="fw-bold">
                        Custom Maps for Among Us
                    </h1>
                    <p className="text-muted">
                        Editor Tool &middot; Among Us Mod &middot; Community Workshop
                    </p>
                    <div className={"d-flex flex-row"}>
                        <Button
                            variant="primary"
                            size="lg"
                            href={downloadLink}
                            className={"m-1"}
                        >
                            Download Mod
                        </Button>
                        <Button
                            variant="danger"
                            size="lg"
                            href="https://editor.levelimposter.net/"
                            className={"m-1"}
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
                    className={"text-center d-flex justify-content-center align-items-center flex-column mt-4"}
                >
                    <img
                        alt=""
                        src="/editor-3.png"
                        className={"w-100 rounded-top-3"}
                    />
                </Col>
            </Row>
        </Container>
    );
}
