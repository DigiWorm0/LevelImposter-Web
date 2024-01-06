import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import KoFiButton from './KoFiButton';

export default function MainFooter() {
    return (
        <>
            <Navbar
                variant={"dark"}
                expand={"lg"}
                style={{
                    backgroundColor: "#111418",
                    flexWrap: "wrap",
                }}
            >
                <Container className={"ps-5 pe-5"}>
                    <div className={"text-center"}>
                        <p className={"text-light m-1"}>
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
                <hr className={"ms-5 me-5 w-100 border-1 border-secondary"} />
                <Container className={"text-center pb-2 text-muted"}>
                    <p>
                        LevelImposter is not affiliated with Among Us or Innersloth LLC, and the content contained
                        therein is not endorsed or otherwise sponsored by Innersloth LLC. Portions of the materials
                        contained herein are property of Innersloth LLC. © Innersloth LLC.
                    </p>
                </Container>
            </Navbar>
        </>
    );
}
