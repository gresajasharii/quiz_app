import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Timer from './Timer';
import { checkSession, submitQuizResult, fetchQuizzes } from '../api/quizApi';
import { Container, Typography, Button, Grid, CircularProgress } from '@mui/material';
import styles from '../styles/Quiz.module.css'; 

interface QuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: QuestionType[];
}

interface QuizProps {
  userId: string;
}

export default function Quiz({ userId }: QuizProps) {
  const navigate = useNavigate();
  const { data: quizData, isLoading, isError, error } = useQuery<Quiz[]>({
    queryKey: ['quiz'],
    queryFn: fetchQuizzes,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(120);  //Initialize timer with 2 minutes per question
  const quizId = 1;


  // Effect to check if the quiz has already been completed by the user
  useEffect(() => {
    const checkCompletionStatus = async () => {
      try {
        const response = await checkSession(userId, quizId);
        if (response.completed) {
          navigate('/', { state: { message: 'You have already taken this quiz.' } });
        }
      } catch (error) {
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
  function handleOptionChange(questionId: number, selectedOption: string) {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  }


  // Calculates and submits the user's score after the last question
  async function submitQuiz() {
    if (!quizData || !quizData[0]) return;


    // Calculate total score based on correct answers
    const totalScore = quizData[0].questions.reduce((acc: number, question: QuestionType) => {
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
    return (
      <Container maxWidth="sm" className={styles.container}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'An error occurred'}</Typography>;
  }

  if (!quizData || quizData.length === 0 || quizData[0]?.questions.length === 0) {
    return <Typography>No quizzes available</Typography>;
  }

  const currentQuestion = quizData[0].questions[currentQuestionIndex];

  return (
    <Container maxWidth="sm" className={styles.quizCard}>
      <Typography variant="h4" className={styles.title}>{quizData[0].title}</Typography>
      <div className={styles.timer}><Timer timeLeft={timeLeft} /></div>
      <div className={styles.questionText}>{currentQuestion.question}</div>
      <ul className={styles.optionsList}>
        {currentQuestion.options.map((option, index) => (
          <li key={index} className={styles.optionItem}>
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-${currentQuestion.id}`}
              value={option}
              checked={selectedOptions[currentQuestion.id] === option}
              onChange={() => handleOptionChange(currentQuestion.id, option)}
            />
            <label htmlFor={`option-${index}`} className={styles.optionLabel}>{option}</label>
          </li>
        ))}
      </ul>
      <Grid container spacing={2} className={styles.navButtons}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className={styles.button}
          >
            Previous
          </Button>
        </Grid>
        <Grid item>
          {currentQuestionIndex === quizData[0].questions.length - 1 ? (
            <Button variant="contained" color="primary" onClick={submitQuiz} className={styles.button}>
              Submit Quiz
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={onNext} disabled={timeLeft <= 0} className={styles.button}>
              Next
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
