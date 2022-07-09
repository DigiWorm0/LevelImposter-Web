import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import MainHeader from '../components/home/MainHeader';
import useMaps from '../hooks/useMaps';

export default function Maps() {
    const mapList = useMaps();

    return (
        <>
            <MainHeader />
            <Container className="Maps" style={{ padding: 15 }}>
                <Row>
                    <Col>
                        <h1>Maps</h1>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <ListGroup>
                            {mapList.map((map) => (
                                <ListGroup.Item key={map.id} href={"/map/" + map.id} action>
                                    <h5>{map.name}</h5>
                                    <p>{map.description === "" ? <i>No Description</i> : map.description}</p>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
