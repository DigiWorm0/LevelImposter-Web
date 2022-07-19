import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

export default function NotFound() {
    return (
        <>
            <MainHeader />
            <Container>
                <Row>
                    <Col style={{ padding: 30, textAlign: "center" }}>
                        <h1>404</h1>
                        <h4>This page is no longer among us</h4>
                        <p style={{ fontSize: 8 }}>Ha, get it? Cause...Among Us...I know, I hate it here too.</p>
                        <img src={"/404.gif"} alt={"404"} style={{ width: 300 }} />
                        <br />
                        <i>GIF made by <a href="https://www.youtube.com/channel/UCK4lLN0egKEZnUqjfF5Xd4Q">MashProTato</a></i>
                        <br />
                        <Link
                            to="/"
                            className={"btn btn-primary"}
                            style={{ marginTop: 15 }}>
                            Back to Home
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
