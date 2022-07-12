import React from 'react';
import { Button, Col, Container, Placeholder, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MainHeader from '../components/MainHeader';
import { useMap } from '../hooks/useMaps';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../hooks/Firebase';

export default function Map() {
    const { id } = useParams();
    const map = useMap(id);
    const [downloadURL, setDownloadURL] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (map) {
            const storeRef = ref(storage, map.storageURL);
            getDownloadURL(storeRef).then((url) => {
                setDownloadURL(url);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [map]);


    return (
        <>
            <MainHeader />
            <Container className="Maps">
                <Row>
                    <Col xs={5} style={{ padding: 30 }}>
                        <img src={"https://via.placeholder.com/500"} alt={"Map"} style={{ width: "100%", borderRadius: 5 }} />
                    </Col>
                    <Col xs={7} style={{ padding: 30 }}>
                        {map ? (
                            <>
                                <h1>{map.name}</h1>
                                <p>{map.description === "" ? <i>No Description</i> : map.description}</p>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        alert("To Be Implemented");
                                    }}>
                                    Launch in Among Us
                                </Button>
                                <br />
                                <Button
                                    variant="outline-danger"
                                    href={downloadURL}
                                    style={{ marginTop: 10 }}>
                                    Download LIM
                                </Button>
                            </>
                        ) : (
                            map === undefined ?
                                (
                                    <>
                                        <Spinner animation="border" />
                                    </>
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
