import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import KoFiButton from './KoFiButton';

export default function MainFooter() {
    return (
        <>
            <Navbar
                variant="dark"
                expand="lg"
                style={{
                    backgroundColor: "#111418",
                    flexWrap: "wrap",
                }}
            >
                <Container className="ps-5 pe-5">
                    <div style={{ textAlign: "center" }}>
                        <p style={{ margin: 5, color: "white" }}>
                            Made with ❤️ by DigiWorm
                        </p>
                        <div>
                            <KoFiButton />
                        </div>
                    </div>
                    <Nav>
                        <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                        <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                        <Link to="/maps" className='nav-link'>Maps</Link>
                        <Link to="/policy" className='nav-link'>Policy</Link>
                    </Nav>
                </Container>
                <hr
                    style={{
                        border: "1px solid rgb(91, 91, 91)",
                        marginLeft: 50,
                        marginRight: 50,
                        width: "100%",
                    }}
                />
                <Container
                    style={{
                        textAlign: "center",
                        color: "white",
                        paddingBottom: 10,
                    }}
                >
                    <p className="text-muted">
                        LevelImposter is not affiliated with Among Us or Innersloth LLC, and the content contained
                        therein is not endorsed or otherwise sponsored by Innersloth LLC. Portions of the materials
                        contained herein are property of Innersloth LLC. © Innersloth LLC.
                    </p>
                </Container>
            </Navbar>
        </>
    );
}
