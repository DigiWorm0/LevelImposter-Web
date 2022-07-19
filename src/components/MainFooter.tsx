import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MainFooter() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Collapse className="justify-content-center">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                        <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                        <Link to="/maps" className='nav-link'>Maps</Link>
                        <Nav.Link href="https://docs.levelimposter.net/">Learn</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
