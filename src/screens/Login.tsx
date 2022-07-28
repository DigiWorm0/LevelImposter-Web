import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import MainHeader from '../components/MainHeader';
import { auth, db, githubProvider, googleProvider } from '../hooks/Firebase';

export default function Login() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState<string | undefined>(undefined);

    if (user) {
        return <Navigate to="/profile" />;
    }

    const handleFirebaseError = (error: any) => {
        if (error.code === 'auth/email-already-in-use') {
            setError('Email already in use');
        }
        if (error.code === 'auth/invalid-email') {
            setError('Invalid email');
        }
        if (error.code === 'auth/weak-password') {
            setError('Password is too weak');
        }
        if (error.code === 'auth/user-not-found') {
            setError('User not found');
        }
        if (error.code === 'auth/wrong-password') {
            setError('Wrong password');
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
        createUserWithEmailAndPassword(auth, username, password).then(onSignUp).catch((e) => {
            handleFirebaseError(e);
        });
    }

    const forgotPassword = () => {
        sendPasswordResetEmail(auth, username).catch((e) => {
            handleFirebaseError(e);
        });
    }

    return (
        <>
            <MainHeader />
            <BetaHeader />
            <Container className="Login">
                <Row style={{ marginTop: 20 }}>
                    <Col xs={12}>
                        <Alert
                            style={{ margin: 10 }}
                            variant="danger"
                            show={error !== undefined}
                            onClose={() => setError(undefined)}>

                            {error}

                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h2 style={{ marginTop: 10 }}>Sign In</h2>
                        <Form onSubmit={signInWithEmail}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
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
                            variant="primary"
                            onClick={signInWithGithub}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                        </Button>
                        <Button
                            style={{ margin: 5 }}
                            variant="primary"
                            onClick={signInWithGoogle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </Button>
                    </Col>
                    <Col lg={6}>
                        <h2 style={{ marginTop: 10 }}>Sign Up</h2>
                        <Form onSubmit={signUpWithEmail}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <Button className="mb-3" variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    );
}
