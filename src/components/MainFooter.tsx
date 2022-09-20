import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import KoFi from './home/KoFi';

export default function MainFooter() {
    return (
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#111418" }}>
            <Container>
                <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 5, color: "white" }}>
                        Made with ❤️ by DigiWorm
                    </p>
                    <div>
                        <KoFi />
                    </div>
                </div>
                <Nav>
                    <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                    <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                    <Link to="/maps" className='nav-link'>Maps</Link>
                    <Nav.Link href="https://docs.levelimposter.net/">Learn</Nav.Link>
                    <Link to="/policy" className='nav-link'>Policy</Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
