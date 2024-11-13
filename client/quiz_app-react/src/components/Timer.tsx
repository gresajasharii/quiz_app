import React from 'react';
import styles from '../styles/Quiz.module.css';

interface TimerProps {
  timeLeft: number; // Time left in seconds
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  // Calculate minutes and seconds from the total seconds provided
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0'); // Format seconds as 2 digits


  // Render the time remaining in MM:SS format
  return (
    <div className={styles.timer}>
      <h2>Time Remaining: {minutes}:{seconds}</h2>
    </div>
  );
};

export default Timer;