import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { auth } from '../hooks/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export default function MainHeader() {
    const [user] = useAuthState(auth);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link to="/" className='navbar-brand'>
                    <img
                        src="/title-transparent.png"
                        alt="LevelImposter"
                        style={{
                            height: 30,
                            margin: 10
                        }} />

                </Link>
                <Navbar.Toggle aria-controls="navbar-main" />
                <Navbar.Collapse id="navbar-main">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                        <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                        <Link to="/maps" className='nav-link'>Maps</Link>
                        <Nav.Link href="https://docs.levelimposter.net/">Learn</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        {user ?
                            <Link to="/profile" className='nav-link'>
                                <img
                                    referrerPolicy="no-referrer"
                                    src={user.photoURL ? user.photoURL : '/#/logo512.png'}
                                    alt={user.displayName ? user.displayName : 'User'}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        marginRight: 10
                                    }} />
                            </Link>
                            :
                            <Link to="/login" className='nav-link'>
                                Sign in
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
