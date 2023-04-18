import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Github, Google } from 'react-bootstrap-icons';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import LIHelment from '../components/LIHelmet';
import MainHeader from '../components/MainHeader';
import { auth, db, githubProvider, googleProvider } from '../hooks/Firebase';

const MIN_PASSWORD_LENGTH = 6;
const MIN_AGE = 13;
const MAX_AGE = 122;

export default function Login() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [dob, setDob] = React.useState('');

    if (user) {
        return <Navigate to="/profile" />;
    }

    const handleFirebaseError = (error: any) => {
        if (error.code === 'auth/email-already-in-use') {
            setError('Email already in use');
        }
        else if (error.code === 'auth/invalid-email') {
            setError('Invalid email');
        }
        else if (error.code === 'auth/weak-password') {
            setError('Password is too weak');
        }
        else if (error.code === 'auth/user-not-found') {
            setError('User not found');
        }
        else if (error.code === 'auth/wrong-password') {
            setError('Wrong password');
        }
        else {
            setError(error.message);
        }
    }

    const onSignUp = (credentials: UserCredential) => {
        const { displayName, photoURL, uid } = credentials.user;

        const usersRef = collection(db, 'users');
        const docRef = doc(usersRef, uid);
        getDoc(docRef).then((doc) => {
            if (!doc.exists()) {
                setDoc(docRef, {
                    displayName,
                    photoURL,
                    uid,
                    isAdmin: false,
                    isCreator: false,
                });
            }
        });
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider).then(onSignUp).catch((e) => {
            handleFirebaseError(e);
        });
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(onSignUp).catch((e) => {
            handleFirebaseError(e);
        });
    }

    const signInWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password).catch((e) => {
            handleFirebaseError(e);
        });
    }

    const signUpWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`Get a better password, this isn't your luggage combination. It must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
            return;
        }
        if (dob === undefined || dob === null || dob === '') {
            setError('Unless you\'re an unborn child, please enter your date of birth.');
            return;
        }
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < MIN_AGE) {
            setError(`Sorry, Uncle Sam requires you must be at least ${MIN_AGE} years old to use LevelImposter.`);
            return;
        }
        if (age > MAX_AGE) {
            setError(`Ha ha, nice try. The oldest person to ever live was ${MAX_AGE} years old. You're not ${age} years old.`);
            return;
        }

        createUserWithEmailAndPassword(auth, username, password).then((cred) => {
            sendEmailVerification(cred.user);
            onSignUp(cred);
        }).catch((e) => {
            handleFirebaseError(e);
        });
    }

    const forgotPassword = () => {
        sendPasswordResetEmail(auth, username).then(() => {
            setError('Password reset email sent');
        }).catch((e) => {
            handleFirebaseError(e);
        });
    }

    return (
        <>

            <LIHelment
                title="LevelImposter - Login"
                description="Login to LevelImposter"
                URL="https://LevelImposter.net/#/login"
            />
            <MainHeader />
            <Container className="Login">
                <Row style={{ marginTop: 20 }}>
                    <Col xs={12}>
                        <Alert
                            style={{ margin: 10 }}
                            variant="danger"
                            show={error !== undefined}
                            onClose={() => setError(undefined)}
                        >
                            {error}
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h2 style={{ marginTop: 10 }}><b>Sign In</b></h2>
                        <Form onSubmit={signInWithEmail}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mb-3" variant="primary" type="submit">
                                Sign In
                            </Button>
                            <Button className="mb-3 ms-1" variant="danger" onClick={forgotPassword}>
                                Forgot Password
                            </Button>
                        </Form>
                        <p className="text-muted">
                            - or -
                        </p>
                        <Button
                            style={{ margin: 5 }}
                            variant="dark"
                            size="lg"
                            onClick={signInWithGoogle}
                        >
                            <Google size={24} />
                        </Button>
                        <Button
                            style={{ margin: 5 }}
                            variant="dark"
                            size="lg"
                            onClick={signInWithGithub}
                        >
                            <Github size={24} />
                        </Button>
                    </Col>
                    <Col lg={6}>
                        <h2 style={{ marginTop: 10 }}><b>Sign Up</b></h2>
                        <Form onSubmit={signUpWithEmail}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={dob}
                                    className={"bg-dark text-white border-0"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mb-3" variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
