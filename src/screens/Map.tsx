import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MainHeader from '../components/home/MainHeader';
import { useMap } from '../hooks/useMaps';

export default function Map() {
    const { id } = useParams();
    const map = useMap(id);

    return (
        <>
            <MainHeader />
            <Container className="Maps" style={{ padding: 15 }}>
                <Row>
                    <Col>
                        {map ? (
                            <>
                                <h1>{map.name}</h1>
                                <p>{map.description === "" ? <i>No Description</i> : map.description}</p>
                            </>
                        ) : (
                            map === undefined ?
                                (
                                    <Spinner animation='border' />
                                ) : (
                                    <>
                                        <h1>404</h1>
                                        <h5>Map of id '{id}' was not found</h5>
                                    </>
                                )
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
