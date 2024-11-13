import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from '../styles/Score.module.css';
export default function Score() {
    const [score, setScore] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(null);
    useEffect(() => {
        // Retrieve score and total questions from localStorage
        const lastScore = localStorage.getItem('lastScore');
        const lastTotalQuestions = localStorage.getItem('lastTotalQuestions');
        setScore(lastScore ? parseInt(lastScore) : null);
        setTotalQuestions(lastTotalQuestions ? parseInt(lastTotalQuestions) : null);
    }, []);
    return (_jsxs("div", { className: styles.mainContainer, children: [_jsxs("div", { className: styles.scoreContainer, children: [_jsx("h1", { className: styles.scoreTitle, children: "Your Quiz Score" }), score !== null && totalQuestions !== null ? (_jsxs("div", { children: [_jsxs("p", { className: styles.scoreText, children: ["Total Score: ", score, " / ", totalQuestions * 10] }), _jsxs("p", { className: styles.scoreSubtext, children: ["You answered correctly ", score / 10, " out of ", totalQuestions, " questions."] })] })) : (_jsx("p", { children: "No score available. Please take the quiz to see your results." }))] }), _jsx("button", { className: styles.actionButton, onClick: () => window.location.href = '/', children: "Go Home" })] }));
}
