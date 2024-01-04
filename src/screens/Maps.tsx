import React from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import LIHelmet from "../components/common/LIHelmet";
import MainHeader from '../components/common/MainHeader';
import MapThumbnails from '../components/map/MapThumbnails';
import useMaps from '../hooks/useMaps';
import MapFilter from "../types/MapFilter";
import useUser from "../hooks/useUser";

export default function Maps() {
    const [filter, setFilter] = React.useState<MapFilter>(MapFilter.Featured);
    const mapList = useMaps(filter);
    const user = useUser();

    return (
        <>
            <LIHelmet
                title="LevelImposter - Maps"
                URL="https://LevelImposter.net/#/Maps"
            />
            <MainHeader />

            <Container>
                <Row style={{ paddingTop: 50 }}>
                    <Col lg={{ offset: 1, span: 5 }}>
                        <h2>
                            <b>Map Workshop</b>
                        </h2>
                        <p className="text-muted">
                            Browse and play maps created by the community.
                        </p>
                    </Col>
                    <Col
                        lg={5}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <InputGroup>
                            <Form.Control
                                as="input"
                                size="lg"
                                placeholder="Search maps..."
                                className="bg-dark text-white border-0"
                            />
                            <Dropdown style={{ marginTop: 20, marginLeft: 20 }}>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {Object.keys(MapFilter).map((key) => {
                                        const value = MapFilter[key as keyof typeof MapFilter];

                                        if (value === MapFilter.Private && !user?.isAdmin)
                                            return null;

                                        return (
                                            <Dropdown.Item
                                                key={key}
                                                onClick={() => setFilter(value)}
                                                active={filter === value}
                                            >
                                                {key}
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
                    <Col>
                        {mapList.error?.message && (
                            <p className={"text-danger"}>
                                {mapList.error.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        {mapList.hasMore && (
                            <Button
                                variant="primary"
                                onClick={() => mapList.loadMore()}
                                style={{
                                    marginBottom: 20,
                                    minWidth: 200,
                                }}
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
