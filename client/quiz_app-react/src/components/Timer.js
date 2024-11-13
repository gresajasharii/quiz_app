import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styles from '../styles/Quiz.module.css';
const Timer = ({ timeLeft }) => {
    // Calculate minutes and seconds from the total seconds provided
    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, '0'); // Format seconds as 2 digits
    // Render the time remaining in MM:SS format
    return (_jsx("div", { className: styles.timer, children: _jsxs("h2", { children: ["Time Remaining: ", minutes, ":", seconds] }) }));
};
export default Timer;
