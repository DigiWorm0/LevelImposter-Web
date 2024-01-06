import { Col, Container, Row } from "react-bootstrap";
import MapThumbnails from "../map/MapThumbnails";
import { Link } from "react-router-dom";
import useMaps from "../../hooks/useMaps";

export default function HomeWorkshopBanner() {
    const featuredMaps = useMaps();

    return (
        <>
            <Container fluid>
                <Row className={"mt-5"}>
                    <Col>
                        <Container>
                            <h2 className={"fw-bold ms-5 mt-4"}>
                                Map Workshop
                            </h2>
                            <p className={"text-muted mb-0 ms-5 mb-3"}>
                                Browse and play maps created by the community.
                            </p>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                        <MapThumbnails
                            maps={featuredMaps.maps}
                            scroll
                        />
                    </Col>
                </Row>
                <Row className={"text-center"}>
                    <Col>
                        <Link to="/maps" className="btn btn-danger m-4 mt-2">
                            View All Maps
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}