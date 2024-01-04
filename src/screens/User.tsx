import { Badge, Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import { useUserMaps } from '../hooks/useMaps';
import useUser, { _useUser } from '../hooks/useUser';
import UserDeleteBtn from '../components/map/UserDeleteBtn';
import UserBanBtn from '../components/map/UserBanBtn';
import MapThumbnails from "../components/map/MapThumbnails";
import React from "react";

export default function User() {
    const { id } = useParams();
    const user = useUser();
    const author = _useUser(id);
    const authorMaps = useUserMaps(id);

    const authorName = author?.displayName ? author.displayName : 'Unknown User';

    if (user?.uid === id) {
        return <Navigate to="/profile" />;
    }

    return (
        <>
            <LIHelmet
                title={`${author?.displayName || "LevelImposter"} - User`}
                description={`View ${(author?.displayName + "'s") || "your"} profile and maps.`}
                URL={`https://LevelImposter.net/#/User/${id}`}
            />
            <MainHeader />
            <Container className="Maps">
                <Row>
                    <Col lg={12} className={"text-center mt-5"}>
                        <h3>
                            <img
                                referrerPolicy="no-referrer"
                                src={author?.photoURL ?? '/logo512.png'}
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 14,
                                    borderRadius: 10,
                                    objectFit: 'cover',
                                }}
                            />
                            {authorName}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapThumbnails maps={authorMaps.maps} />
                    </Col>
                </Row>
                <Row>
                    <Col className={"text-center"}>
                        {authorMaps.maps.length === 0 && (
                            <p className={"text-muted"}>
                                No maps by this author.
                            </p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col lg={{ offset: 3, span: 6 }} style={{ textAlign: "center" }}>
                        {id && (
                            <UserBanBtn id={id} />
                        )}
                        {id && (
                            <UserDeleteBtn id={id} />
                        )}

                        <div style={{ marginTop: 10 }}>
                            {author?.isAdmin && (
                                <Badge
                                    pill
                                    bg="danger"
                                    style={{ marginLeft: 5 }}
                                >
                                    Admin
                                </Badge>
                            )}

                            {author?.isCreator && (
                                <Badge
                                    pill
                                    bg="primary"
                                    style={{ marginLeft: 5 }}
                                >
                                    Creator
                                </Badge>
                            )}

                            {author?.isBanned && (
                                <Badge
                                    pill
                                    bg="danger"
                                    style={{ marginLeft: 5 }}
                                >
                                    Banned
                                </Badge>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
