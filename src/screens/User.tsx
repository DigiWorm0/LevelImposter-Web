import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import useMaps from '../hooks/useMaps';

export default function User() {
    const { id } = useParams();
    //const user = useUser(id); // <-- TODO
    const mapList = useMaps(id);


    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="User">
                <Row>
                    <Col xs={{ span: 1, offset: 3 }} style={{ textAlign: "center" }}>
                        <img
                            src={'https://via.placeholder.com/150'}
                            alt={'User'}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                marginTop: 30,
                                marginBottom: 30,
                            }}
                        />
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <h2 style={{ marginTop: 30 }}>
                            {id}
                        </h2>
                        <h6>
                            {id}
                        </h6>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 4 }}>
                        <h3>User's Maps:</h3>

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
