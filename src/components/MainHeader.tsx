import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../hooks/Firebase';

export default function MainHeader(props: { children?: React.ReactNode }) {
    const [user] = useAuthState(auth);

    return (
        <div style={{
            boxShadow: props.children ? "rgb(0, 0, 0) 0px -20px 20px -10px inset" : "rgb(0, 0, 0) 0px 0px 10px 2px",
            backgroundColor: "rgb(15, 17, 19)"
        }}>
            <Navbar variant="dark" expand="lg" style={{ height: 100 }}>
                <Container>
                    <Link to="/" className='navbar-brand'>
                        <img
                            src="/title-white.png"
                            alt="LevelImposter"
                            style={{
                                height: 30,
                                margin: 10
                            }} />

                    </Link>

                    <Navbar.Toggle aria-controls="navbar-main" />
                    <Navbar.Collapse id="navbar-main" className="justify-content-end" style={{ backgroundColor: "rgb(15, 17, 19)", padding: 20 }}>
                        <Nav className="mr-auto">
                            <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                            <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                            <Link to="/maps" className='nav-link'>Maps</Link>
                            <Nav.Link href="https://docs.levelimposter.net/">Learn</Nav.Link>
                        </Nav>
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
                                            marginLeft: 10,
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
            {props.children}
        </div>
    );
}
