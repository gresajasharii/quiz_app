# Online Quiz Application

The Online Quiz Application is a user-friendly platform where users can take quizzes, track scores, and avoid retaking the same quiz. Built with React.js and Vite on the frontend and Node.js with Fastify on the backend, it offers a seamless and efficient experience. Data is securely managed with a PostgreSQL database hosted on NeonDB.


# Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
   - [Frontend Setup](#frontend-setup)
    - [Backend Setup](#backend-setup)
4. [Project Structure](#project-structure)
5. [Screenshots](#screenshots)



# Features

- **Start Quiz:** Users can log in using their email and take a quiz.
- **Session Management:** Restricts users from retaking the same quiz.
- **Quiz Timer:** Limits the time per question.
- **Score Display:** Displays the user's final score after completing the quiz.


# Technologies Used

### Backend
- **Node.js v20** 
- **Fastify**
- **Prisma**
- **PostgreSQL(NeonDB)** 
- **TypeScript** 
- **CORS** 

### Frontend
- **React with Vite** 
- **Typescript** 
- **Material-UI** 
- **React Router** 
- **Axios** 
- **CSS Modules** 


# Installation and Setup

Ensure you have the following installed on your system:

- **Node.js (v16 or later)**
- **npm (Node Package Manager)**
- **PostgreSQL (or access to a PostgreSQL-compatible cloud database like NeonDB)**

1. Clone the Repository: git clone:    
https://github.com/gresajasharii/quiz_app


# Installation

### Frontend setup

- **cd ../client**
- **npm install**
- **npm run dev**

- **The app will be available at http://localhost:5173**


### Backend setup

- **cd ../sever**
- **Create Environment Variables:** 
   - **Add a .env file in the server directory with the following content:**
     - **DATABASE_URL=your_postgresql_database_url**
     - **PORT 5000**
 - **npm install**
- **Set Up the Database:**
   - **Run migrations to create the database schema:** 
      - **npx prisma migrate dev --name init**
   - **Seed the database with sample data:** 
      - **npx ts-node prisma/seed.ts**
 - **npm run dev**

- **The backend will be available at http://localhost:5000**


# Project Structure

### API Endpoints:

The backend provides the following endpoints:

- **GET /api/quizzes:**
Fetches all quizzes along with their questions

- **POST /api/start-session:**
Starts a quiz session for a user if they haven't completed it
    - **Body:** 
     - **json**
     - **{**
     - **"email": "user@student.uni-pr.edu",**
     - **"quizId": 1**
     - **}**

- **GET /api/check-session:**
Checks if a user has already completed a quiz
     - **Query Parameters:**
     - **email: user@student.uni-pr.edu**
     - **quizId: 1**

- **POST /api/submit-quiz:**
Submits the user’s quiz score and marks the quiz as completed
     - **Body:**
     - **json**
     - **{**
     - **"email": "user@student.uni-pr.edu",**
     - **"quizId": 1,**
     - **"score": 85,**
     - **"totalQuestions": 10**
     - **}**

- **GET /api/quiz-results:** 
Fetches all submitted quiz results


# Screenshots

This is the main page where users are required to enter their email to start the quiz. If you try to enter an email that does not end with `@student.uni-pr.edu`, a validation message is displayed, as shown in the screenshot below:

![Main Page Email Validation](images/1.png)


After entering the email `student@student.uni-pr.edu`, the application displays the quiz questions with two options: True and False. Users have the ability to navigate to the previous question to revise their answers if needed.

![Quiz Questions](images/2.png)


Upon completing the quiz, the results are displayed, showing the score and a "Go Home" button that redirects users back to the main page.

![Quiz Results](images/3.png)


If the user attempts to retake the quiz with the same email student@student.uni-pr.edu, the application prevents the action and displays a validation message, as shown in the screenshot.

![Retaking Quiz Restriction](images/4.png)

