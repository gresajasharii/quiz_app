import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkSession, startSession } from '../api/quizApi';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import styles from '../styles/Main.module.css';
export default function Main() {
    const inputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.message) {
            setErrorMessage(location.state.message);
            setOpenSnackbar(true);
        }
    }, [location.state]);
    const handleEmailChange = () => {
        setErrorMessage(null);
    };
    // Function to handle the "Start Quiz" button click
    const handleStartQuiz = async () => {
        const email = inputRef.current?.value;
        const quizId = 1;
        if (!email) {
            setErrorMessage("Please enter your email.");
            setOpenSnackbar(true);
            return;
        }
        if (!email.endsWith("@student.uni-pr.edu")) {
            setErrorMessage("Only accessible to UP students.");
            setOpenSnackbar(true);
            return;
        }
        try {
            const response = await checkSession(email, quizId);
            if (response.completed) {
                setErrorMessage("You have already taken this quiz.");
                setOpenSnackbar(true);
            }
            else {
                await startSession(email, quizId);
                navigate('/quiz', { state: { userId: email } });
            }
        }
        catch (error) {
            setErrorMessage("Error: " + (error instanceof Error ? error.message : "An unexpected error occurred"));
            setOpenSnackbar(true);
        }
    };
    return (_jsxs(Container, { maxWidth: "sm", className: styles.pageWrapper, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, className: styles.title, children: "  Online Quiz Application " }), _jsx(Typography, { variant: "subtitle1", className: styles.introText, children: " Are you ready to test your knowledge? " }), _jsxs(Typography, { variant: "body2", className: styles.instructions, children: ["Answer 10 questions with a single attempt for each.", _jsx("br", {}), "You can review and change your answers before submitting the quiz."] }), _jsx(TextField, { inputRef: inputRef, label: "Enter your email student", variant: "outlined", fullWidth: true, margin: "normal", onChange: handleEmailChange, className: styles.emailInput }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleStartQuiz, className: styles.startButton, children: "Start Quiz" }), _jsx(Snackbar, { open: openSnackbar, autoHideDuration: 6000, onClose: () => setOpenSnackbar(false), children: _jsx(Alert, { onClose: () => setOpenSnackbar(false), severity: "error", variant: "filled", children: errorMessage }) })] }));
}
