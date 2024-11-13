// Base URL for the API endpoints
const BASE_URL = 'http://localhost:5000/api';

// Function to start a session for a specific user and quiz
export async function startSession(email: string, quizId: number) {
    // Sending a POST request to start a session
  const response = await fetch(`${BASE_URL}/start-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, quizId }), // Sending email and quizId in the request body
  });
  
  if (!response.ok) {
    throw new Error('Failed to start session');
  }
    // Return the JSON data from the response
  return response.json();
}

// Function to check if a session exists for a specific user and quiz
export async function checkSession(email: string, quizId: number) {
    // Sending a GET request to check the session
  const response = await fetch(`${BASE_URL}/check-session?email=${email}&quizId=${quizId}`);
  if (!response.ok) {
    throw new Error('Failed to check session');
  }
  return response.json();  
}

// Function to submit the quiz result after completion
export async function submitQuizResult(data: {
  email: string;
  quizId: number;
  score: number;
  totalQuestions: number;
}) {
    // Sending a POST request to submit the quiz result
  const response = await fetch(`${BASE_URL}/submit-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // Sending result data (email, quizId, score, totalQuestions)
  });
  if (!response.ok) {
    throw new Error('Failed to submit quiz result');
  }
  return response.json();
}

// Function to fetch all available quizzes
export async function fetchQuizzes() {
    // Sending a GET request to fetch the list of quizzes
  const response = await fetch(`${BASE_URL}/quizzes`);
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return response.json();
}