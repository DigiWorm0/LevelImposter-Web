import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { auth } from '../../hooks/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function MainHeader() {
    const [user] = useAuthState(auth);

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/title-transparent.png"
                        alt="LevelImposter"
                        style={{
                            height: 30,
                            margin: 10
                        }} />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-main" />
                <Navbar.Collapse id="navbar-main">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://docs.levelimposter.net/">Docs</Nav.Link>
                        <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                        <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                        <Nav.Link href="/maps/">Maps</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        {user ?
                            <Nav.Link href="/profile">
                                <img
                                    src={user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'}
                                    alt={user.displayName ? user.displayName : 'User'}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        marginRight: 10
                                    }} />
                            </Nav.Link>
                            :
                            <Nav.Link href="/login">
                                Sign in
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
