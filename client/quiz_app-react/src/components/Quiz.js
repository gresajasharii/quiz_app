import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Timer from './Timer';
import { checkSession, submitQuizResult, fetchQuizzes } from '../api/quizApi';
import { Container, Typography, Button, Grid, CircularProgress } from '@mui/material';
import styles from '../styles/Quiz.module.css';
export default function Quiz({ userId }) {
    const navigate = useNavigate();
    const { data: quizData, isLoading, isError, error } = useQuery({
        queryKey: ['quiz'],
        queryFn: fetchQuizzes,
    });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [timeLeft, setTimeLeft] = useState(120); //Initialize timer with 2 minutes per question
    const quizId = 1;
    // Effect to check if the quiz has already been completed by the user
    useEffect(() => {
        const checkCompletionStatus = async () => {
            try {
                const response = await checkSession(userId, quizId);
                if (response.completed) {
                    navigate('/', { state: { message: 'You have already taken this quiz.' } });
                }
            }
            catch (error) {
                console.error('Error checking session:', error);
            }
        };
        checkCompletionStatus();
    }, [navigate, userId, quizId]);
    // Timer effect: counts down and navigates to the next question when time expires
    useEffect(() => {
        if (timeLeft <= 0) {
            onNext();
            return;
        }
        const timerId = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft]);
    // Navigate to the next question; resets timer to 2 minutes
    function onNext() {
        if (quizData && quizData[0] && currentQuestionIndex < quizData[0].questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(120);
        }
    }
    function onPrevious() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setTimeLeft(120);
        }
    }
    // Update selected option for the current question
    function handleOptionChange(questionId, selectedOption) {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    }
    // Calculates and submits the user's score after the last question
    async function submitQuiz() {
        if (!quizData || !quizData[0])
            return;
        // Calculate total score based on correct answers
        const totalScore = quizData[0].questions.reduce((acc, question) => {
            return acc + (selectedOptions[question.id] === question.correctAnswer ? 10 : 0);
        }, 0);
        try {
            await submitQuizResult({
                email: userId,
                quizId,
                score: totalScore,
                totalQuestions: quizData[0].questions.length,
            });
            localStorage.setItem('lastScore', totalScore.toString());
            localStorage.setItem('lastTotalQuestions', quizData[0].questions.length.toString());
            navigate('/score');
        }
        catch (error) {
            console.error('Error submitting quiz:', error);
        }
    }
    if (isLoading) {
        return (_jsx(Container, { maxWidth: "sm", className: styles.container, children: _jsx(CircularProgress, {}) }));
    }
    if (isError) {
        return _jsxs(Typography, { color: "error", children: ["Error: ", error?.message || 'An error occurred'] });
    }
    if (!quizData || quizData.length === 0 || quizData[0]?.questions.length === 0) {
        return _jsx(Typography, { children: "No quizzes available" });
    }
    const currentQuestion = quizData[0].questions[currentQuestionIndex];
    return (_jsxs(Container, { maxWidth: "sm", className: styles.quizCard, children: [_jsx(Typography, { variant: "h4", className: styles.title, children: quizData[0].title }), _jsx("div", { className: styles.timer, children: _jsx(Timer, { timeLeft: timeLeft }) }), _jsx("div", { className: styles.questionText, children: currentQuestion.question }), _jsx("ul", { className: styles.optionsList, children: currentQuestion.options.map((option, index) => (_jsxs("li", { className: styles.optionItem, children: [_jsx("input", { type: "radio", id: `option-${index}`, name: `question-${currentQuestion.id}`, value: option, checked: selectedOptions[currentQuestion.id] === option, onChange: () => handleOptionChange(currentQuestion.id, option) }), _jsx("label", { htmlFor: `option-${index}`, className: styles.optionLabel, children: option })] }, index))) }), _jsxs(Grid, { container: true, spacing: 2, className: styles.navButtons, children: [_jsx(Grid, { item: true, children: _jsx(Button, { variant: "contained", color: "secondary", onClick: onPrevious, disabled: currentQuestionIndex === 0, className: styles.button, children: "Previous" }) }), _jsx(Grid, { item: true, children: currentQuestionIndex === quizData[0].questions.length - 1 ? (_jsx(Button, { variant: "contained", color: "primary", onClick: submitQuiz, className: styles.button, children: "Submit Quiz" })) : (_jsx(Button, { variant: "contained", color: "primary", onClick: onNext, disabled: timeLeft <= 0, className: styles.button, children: "Next" })) })] })] }));
}
