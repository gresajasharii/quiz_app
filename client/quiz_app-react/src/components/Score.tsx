import { useEffect, useState } from 'react';
import styles from '../styles/Score.module.css';

export default function Score() {
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve score and total questions from localStorage
    const lastScore = localStorage.getItem('lastScore');
    const lastTotalQuestions = localStorage.getItem('lastTotalQuestions');

    setScore(lastScore ? parseInt(lastScore) : null);
    setTotalQuestions(lastTotalQuestions ? parseInt(lastTotalQuestions) : null);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scoreContainer}>
        <h1 className={styles.scoreTitle}>Your Quiz Score</h1>
        {score !== null && totalQuestions !== null ? (
          <div>
            <p className={styles.scoreText}>Total Score: {score} / {totalQuestions * 10}</p>
            <p className={styles.scoreSubtext}>
              You answered correctly {score / 10} out of {totalQuestions} questions.
            </p>
          </div>
        ) : (
          <p>No score available. Please take the quiz to see your results.</p>
        )}
      </div>
      <button
        className={styles.actionButton}
        onClick={() => window.location.href = '/'} // Redirect to home or main page
      >
        Go Home
      </button>
    </div>
  );
}