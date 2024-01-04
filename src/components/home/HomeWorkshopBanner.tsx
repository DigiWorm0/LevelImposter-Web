import { Col, Container, Row } from "react-bootstrap";
import MapThumbnails from "../map/MapThumbnails";
import { Link } from "react-router-dom";
import useMaps from "../../hooks/useMaps";

export default function HomeWorkshopBanner() {
    const featuredMaps = useMaps();

    return (
        <>
            <Container>
                <Row style={{ paddingTop: 70 }}>
                    <Col lg={{ offset: 1, span: 5 }}>
                        <h2>
                            <b>Map Workshop</b>
                        </h2>
                        <p className="text-muted" style={{ paddingBottom: 0 }}>
                            Browse and play maps created by the community.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col sm>
                        <MapThumbnails
                            maps={featuredMaps.maps}
                            scroll
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Link to="/maps" className="btn btn-danger" style={{ marginBottom: 40, marginTop: 20 }}>
                            View All Maps
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}