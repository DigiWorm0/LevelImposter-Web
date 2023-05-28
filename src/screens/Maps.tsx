import React from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import LIHelment from "../components/LIHelmet";
import MainHeader from '../components/MainHeader';
import MapBanners from '../components/map/MapBanners';
import { MapList, usePrivateMaps, useRecentMaps, useTopMaps, useVerifiedMaps } from '../hooks/useMaps';

export default function Maps() {
    const topMaps = useTopMaps();
    const featuredMaps = useVerifiedMaps();
    const recentMaps = useRecentMaps();
    const privateMaps = usePrivateMaps();
    const [activeList, setActiveList] = React.useState<MapList>(topMaps);
    const [filteredMaps, setFilteredMaps] = React.useState(topMaps.maps);
    const [filter, setFilter] = React.useState<undefined | string>(undefined);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        const mapList = filter === 'top' ? topMaps :
            filter === 'featured' ? featuredMaps :
                filter === 'recent' ? recentMaps :
                    filter === 'private' ? privateMaps :
                        topMaps;
        setActiveList(mapList);
    }, [filter, topMaps, featuredMaps, recentMaps, privateMaps]);

    React.useEffect(() => {
        if (search === '') {
            setFilteredMaps(activeList.maps);
            return;
        }
        const filtered = activeList.maps.filter(map => {
            return map.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredMaps(filtered);
    }, [search, activeList]);

    return (
        <>
            <LIHelment
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
                                onInput={(e) => setSearch(e.currentTarget.value)}
                            />
                            <Dropdown style={{ marginTop: 20, marginLeft: 20 }}>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {filter === 'top' ? 'Top' :
                                        filter === 'featured' ? 'Featured' :
                                            filter === 'recent' ? 'Recent' :
                                                filter === 'private' ? 'Private' :
                                                    'Filter By'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setFilter('top')} active={filter === 'top'}>Top</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFilter('featured')} active={filter === 'featured'}>Featured</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFilter('recent')} active={filter === 'recent'}>Recent</Dropdown.Item>
                                    {privateMaps.maps.length > 0 && <Dropdown.Item onClick={() => setFilter('private')} active={filter === 'private'}>Private</Dropdown.Item>}
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapBanners maps={filteredMaps} />
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
                        {activeList.hasMore && (
                            <Button
                                variant="primary"
                                onClick={() => activeList.loadMore()}
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
