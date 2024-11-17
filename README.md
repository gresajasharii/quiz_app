# Online Quiz Application

An Online Quiz Application that allows users to take quizzes, view their scores, and prevents users from retaking the same quiz. Built with a modern tech stack, this app features a responsive frontend and a scalable backend.


# Features

Start Quiz: Users can log in using their email and take a quiz
Session Management: Restricts users from retaking the same quiz
Quiz Timer: Limits the time per question
Score Display: Displays the user’s final score after completing the quiz


# Tech Stack

*Frontend*
React with TypeScript
Vite (Build Tool)
Material-UI (UI Components)
React Query (API Handling & State Management)
React Router (Navigation)
Axios (HTTP Requests)
CSS Modules (Styling)

*Backend*
Fastify (Web Framework)
Prisma (ORM)
PostgreSQL (NeonDB)
TypeScript (Static Typing)
Dotenv (Environment Variables)
CORS (Cross-Origin Resource Sharing)



# Installation and Setup

*Prerequisites*

Ensure you have the following installed on your system:

Node.js (v16 or later)
npm (Node Package Manager)
PostgreSQL (or access to a PostgreSQL-compatible cloud database like NeonDB)

Clone the Repository: git clone: 
https://github.com/gresajasharii/quizapp


# Installation
*Frontend*
1. Navigate to the Frontend folder: 
   cd quiz_app/client/quiz_app-react
2. Install dependencies: 
   npm install
3. Start the Frontend Server: 
   npm run dev

The app will be available at http://localhost:5173


*Backend*
1. Navigate to the Backend Folder: 
   cd quiz_app/server
2. Create Environment Variables: 
   Add a .env file in the server directory with the following content:
   DATABASE_URL=your_postgresql_database_url
3. Install Dependencies: 
   npm install
4. Set Up the Database:
   Run migrations to create the database schema: npx prisma migrate dev --name init
   Seed the database with sample data: npx ts-node prisma/seed.ts
5. Start the Backend Server:
   npm run dev

The backend will be available at http://localhost:5000.


# Project Structure

*Frontend*

src/components:

App.tsx: Sets up routing and React Query client
Main.tsx: Email student input and start quiz session
Quiz.tsx: Handles quiz questions and user responses
Question.tsx: Displays a single question
Timer.tsx: Countdown timer for quiz time management
Score.tsx: Displays the user’s final score

src/api/quizApi.ts: the API calls for quiz actions

src/styles: CSS Modules for styling



*Backend*

server/index.ts: Fastify server setup and API routes

server/SessionManager.ts: Handles session tracking


# API Endpoints:

The backend provides the following endpoints:

1. GET /api/quizzes - Fetches all quizzes along with their questions

2. POST /api/start-session - Starts a quiz session for a user if they haven't completed it
   Body: 
   json
   {
     "email": "user@student.uni-pr.edu",
     "quizId": 1
   }

3. GET /api/check-session - Checks if a user has already completed a quiz
   Query Parameters:
   email: user@student.uni-pr.edu
   quizId: 1

4. POST /api/submit-quiz - Submits the user’s quiz score and marks the quiz as completed.
   Body:
   json
   {
     "email": "user@student.uni-pr.edu",
     "quizId": 1,
     "score": 85,
     "totalQuestions": 10
   }

5. GET /api/quiz-results - Fetches all submitted quiz results.


