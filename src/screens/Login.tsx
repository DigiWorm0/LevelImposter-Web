import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Github, Google, Microsoft } from 'react-bootstrap-icons';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';
import { auth, githubProvider, googleProvider, microsoftProvider } from '../hooks/utils/Firebase';

const MIN_PASSWORD_LENGTH = 6;
const MIN_AGE = 13;
const MAX_AGE = 122;
const ERROR_MESSAGES: Record<string, string> = {
    "auth/email-already-in-use": "Email already in use",
    "auth/invalid-email": "Invalid email",
    "auth/weak-password": "Password is too weak",
    "auth/user-not-found": "An account with this email does not exist",
    "auth/wrong-password": "Incorrect password",
    "auth/cancelled-popup-request": "Cancelled popup request",
    "auth/popup-closed-by-user": "Popup closed by user",
    "auth/missing-email": "Please enter an email address below",
    "auth/internal-error": "Internal error, an extension may be blocking this request. Try disabling extensions or using a different browser.",
    "auth/invalid-credential": "Invalid credential",
    "auth/user-cancelled": "Cancelled popup request",
}

export default function Login() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [dob, setDob] = React.useState('');

    // Error Handling
    const handleFirebaseError = React.useCallback((error: any) => {
        console.error(error);
        if (error.code in ERROR_MESSAGES)
            setError(ERROR_MESSAGES[error.code]);
        else
            setError(error.message);
    }, []);

    // Sign In
    const signInWithGithub = React.useCallback(() => {
        signInWithPopup(auth, githubProvider).catch(handleFirebaseError);
    }, [handleFirebaseError]);
    const signInWithGoogle = React.useCallback(() => {
        signInWithPopup(auth, googleProvider).catch(handleFirebaseError);
    }, [handleFirebaseError]);
    const signInWithMicrosoft = React.useCallback(() => {
        signInWithPopup(auth, microsoftProvider).catch(handleFirebaseError);
    }, [handleFirebaseError]);
    const signInWithEmail = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password).catch(handleFirebaseError);
    }, [handleFirebaseError, password, username]);

    // Sign Up
    const signUpWithEmail = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        const age = new Date().getFullYear() - new Date(dob ?? "").getFullYear();
        e.preventDefault();

        // Password Requirements
        if (password !== confirmPassword)
            setError('Passwords do not match');
        else if (password.length < MIN_PASSWORD_LENGTH)
            setError(`Get a better password, this isn't your luggage combination. It must be at least ${MIN_PASSWORD_LENGTH} characters long.`);

        // Age Requirements
        else if (dob === undefined || dob === null || dob === '')
            setError('Unless you\'re an unborn child, please enter your date of birth.');
        else if (age < MIN_AGE)
            setError(`Sorry, Uncle Sam requires you must be at least ${MIN_AGE} years old to use LevelImposter.`);
        else if (age > MAX_AGE)
            setError(`Ha ha, nice try. The oldest person to ever live was ${MAX_AGE} years old. You're not ${age} years old.`);

        // Create Account
        else
            createUserWithEmailAndPassword(auth, username, password).then((cred) => {
                return sendEmailVerification(cred.user);
            }).catch(handleFirebaseError);
    }, [confirmPassword, dob, handleFirebaseError, password, username]);

    // Forgot Password
    const forgotPassword = React.useCallback(() => {
        sendPasswordResetEmail(auth, username).then(() => {
            setError('Password reset email sent');
        }).catch(handleFirebaseError);
    }, [handleFirebaseError, username]);

    // Redirect to profile if logged in
    if (user)
        return (<Navigate to="/profile" />);

    return (
        <>

            <LIHelmet
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
                            className={"m-1"}
                            variant="dark"
                            size="lg"
                            onClick={signInWithGoogle}
                        >
                            <Google size={24} />
                        </Button>
                        <Button
                            className={"m-1"}
                            variant="dark"
                            size="lg"
                            onClick={signInWithGithub}
                        >
                            <Github size={24} />
                        </Button>
                        <Button
                            className={"m-1"}
                            variant="dark"
                            size="lg"
                            onClick={signInWithMicrosoft}
                        >
                            <Microsoft size={24} />
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
                <Row>
                    <p className={"text-center text-muted"}>
                        By signing up for an account, you agree to our <a href="/#/policy">site policies</a>.
                    </p>
                </Row>
            </Container>
        </>
    );
}
