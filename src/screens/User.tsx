import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import { useUserMaps } from '../hooks/useMaps';
import useCurrentUser, { useUser } from '../hooks/useUser';
import UserDeleteBtn from '../components/map/UserDeleteBtn';
import UserBanBtn from '../components/map/UserBanBtn';
import MapThumbnails from "../components/map/MapThumbnails";
import React from "react";
import DisplayTag from "../components/common/DisplayTag";
import TagType from "../types/TagType";

export default function User() {
    const { id } = useParams();
    const user = useCurrentUser();
    const author = useUser(id);
    const authorMaps = useUserMaps(id);

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
                                src={author?.photoURL || "/editor.svg"}
                                alt={author?.displayName || "Anonymous"}
                                width={50}
                                height={50}
                                className={"rounded me-3"}
                                style={{ objectFit: 'cover' }}
                            />
                            {author?.displayName || "Anonymous"}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapThumbnails maps={authorMaps.maps} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {authorMaps.maps.length === 0 && (
                            <p className={"text-muted text-center"}>
                                No maps by this author.
                            </p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col lg={{ offset: 3, span: 6 }} style={{ textAlign: "center" }}>
                        {id && <UserBanBtn id={id} />}
                        {id && <UserDeleteBtn id={id} />}

                        <div style={{ marginTop: 10 }}>
                            {author?.isAdmin && <DisplayTag type={TagType.Admin} />}
                            {author?.isCreator && <DisplayTag type={TagType.Creator} />}
                            {author?.isBanned && <DisplayTag type={TagType.Banned} />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
