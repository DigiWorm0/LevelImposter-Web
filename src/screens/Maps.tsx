import React from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import LIHelmet from "../components/common/LIHelmet";
import MainHeader from '../components/common/MainHeader';
import MapThumbnails from '../components/map/MapThumbnails';
import useMaps from '../hooks/useMaps';
import MapFilter from "../types/MapFilter";
import useCurrentUser from "../hooks/useUser";

export default function Maps() {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [filter, setFilter] = React.useState<MapFilter>(MapFilter.Featured);
    const mapList = useMaps(filter, searchQuery);
    const user = useCurrentUser();

    return (
        <>
            <LIHelmet
                title="LevelImposter - Maps"
                URL="https://LevelImposter.net/#/Maps"
            />
            <MainHeader />

            <Container>
                <Row className={"mt-5"}>
                    <Col lg={6}>
                        <div className={"m-4 ms-lg-5"}>
                            <h2 className={"fw-bold"}>
                                Map Workshop
                            </h2>
                            <p className="text-muted">
                                Browse and play maps created by the community.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} className={"d-flex justify-content-end align-items-center"}>
                        <InputGroup className={"m-4 mt-0 mt-lg-4 me-lg-5"}>
                            <Form.Control
                                as="input"
                                size="lg"
                                placeholder="Search maps..."
                                className="bg-dark text-white border-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Dropdown className={"ms-2 me-2"}>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {Object.keys(MapFilter).map((key) => {
                                        const value = MapFilter[key as keyof typeof MapFilter];

                                        // Hide private filter from non-admins
                                        if (value === MapFilter.Private && !user?.isAdmin)
                                            return null;

                                        return (
                                            <Dropdown.Item
                                                key={key}
                                                onClick={() => setFilter(value)}
                                                active={filter === value}
                                            >
                                                {value}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapThumbnails maps={mapList.maps} />
                    </Col>
                </Row>
                <Row>
                    <Col className={"text-center"}>
                        {mapList.maps.length === 0 && (
                            <p className={"text-muted"}>
                                No maps found.
                            </p>
                        )}
                        {mapList.error?.message && (
                            <p className={"text-danger"}>
                                {mapList.error.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className={"d-flex justify-content-center align-items-center"}>
                        {mapList.hasMore && (
                            <Button
                                variant="primary"
                                onClick={() => mapList.loadMore()}
                                className={"m-2"}
                            >
                                Load More
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
