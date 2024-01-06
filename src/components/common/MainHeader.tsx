import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileIcon from "./ProfileIcon";

export interface MainHeaderProps {
    children?: React.ReactNode;
}

export default function MainHeader(props: MainHeaderProps) {

    return (
        <div
            style={{
                boxShadow: props.children ? "rgb(0, 0, 0) 0px -20px 20px -10px inset" : "rgb(0, 0, 0) 0px 0px 10px 2px",
                backgroundColor: "rgb(15, 17, 19)"
            }}
        >
            <Navbar variant="dark" expand="lg" style={{ height: 100 }}>
                <Container>
                    <Link to="/" className='navbar-brand'>
                        <img
                            src="/title-white.png"
                            alt="LevelImposter"
                            height={30}
                            className={"ms-3"}
                        />
                    </Link>

                    <Navbar.Toggle aria-controls="navbar-main" />
                    <Navbar.Collapse
                        id="navbar-main"
                        className="justify-content-end"
                        style={{ backgroundColor: "rgb(15, 17, 19)", padding: 20 }}
                    >
                        <Nav className="mr-auto">
                            <Nav.Link href="https://github.com/DigiWorm0/LevelImposter/releases">Download</Nav.Link>
                            <Nav.Link href="https://editor.levelimposter.net/">Editor</Nav.Link>
                            <Link to="/maps" className='nav-link'>Maps</Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <ProfileIcon />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {props.children}
        </div>
    );
}
