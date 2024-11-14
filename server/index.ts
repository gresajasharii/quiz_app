import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import sessionManager from './SessionManager.js';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Register CORS to allow cross-origin requests from the frontend
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

// Interfaces for type safety in request payloads
interface StartSessionRequest {
  email: string;
  quizId: number;
}

interface SubmitQuizRequest {
  email: string;
  quizId: number;
  score: number;
  totalQuestions: number;
}

// Endpoint to fetch all quizzes with their questions
fastify.get('/api/quizzes', async (request, reply) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });
    console.log('Quizzes fetched successfully:', quizzes);
    return quizzes;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    reply.status(500).send({ error: 'Failed to fetch quizzes' });
  }
});

// Endpoint to start a quiz session for a user
fastify.post<{ Body: StartSessionRequest }>('/api/start-session', async (request, reply) => {
  const { email, quizId } = request.body;

  if (!email || quizId === undefined) {
    return reply.status(400).send({ error: 'Missing email or quizId' });
  }

  const isCompleted = sessionManager.hasCompleted(email, quizId);
  console.log(`Starting session - email=${email}, quizId=${quizId}, alreadyCompleted=${isCompleted}`);
  if (isCompleted) {
    return reply.status(403).send({ message: 'You have already completed this quiz.' });
  }

  sessionManager.startSession(email, quizId);
  reply.send({ message: 'Session started successfully' });
});

// Endpoint to check the session status of a quiz for a user
fastify.get('/api/check-session', async (request, reply) => {
  const { email, quizId } = request.query as { email: string; quizId: string };

  if (!email || !quizId) {
    console.log('Missing email or quizId:', { email, quizId });
    return reply.status(400).send({ error: 'Missing email or quizId' });
  }

  console.log(`Checking session for email=${email}, quizId=${quizId}`);
  const completed = sessionManager.hasCompleted(email, Number(quizId));
  console.log(`Completion status for email=${email}, quizId=${quizId}: ${completed}`);
  reply.send({ completed });
});

// Endpoint to submit quiz results after completion
fastify.post<{ Body: SubmitQuizRequest }>('/api/submit-quiz', async (request, reply) => {
  const { email, quizId, score, totalQuestions } = request.body;

  const isCompleted = sessionManager.hasCompleted(email, quizId);
  console.log(`Submitting quiz - email=${email}, quizId=${quizId}, alreadyCompleted=${isCompleted}`);
  if (isCompleted) {
    return reply.status(403).send({ message: 'Quiz already completed' });
  }

  try {
    const result = await prisma.userQuizResult.create({
      data: { email, quizId, score, totalQuestions },
    });

    sessionManager.completeSession(email, quizId);
    console.log(`Quiz submission completed for email=${email}, quizId=${quizId}.`);
    reply.send({ message: 'Score submitted successfully!', result });
  } catch (error) {
    console.error('Error submitting quiz result:', error);
    reply.status(500).send({ error: 'Failed to submit quiz score' });
  }
});

// Endpoint to fetch all quiz results
fastify.get('/api/quiz-results', async (request, reply) => {
  try {
    const results = await prisma.userQuizResult.findMany();
    console.log('Quiz results fetched successfully:', results);
    return results;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    reply.status(500).send({ error: 'Failed to fetch quiz results' });
  }
});

// Start the server and connect to the database
const start = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    // Use the PORT environment variable provided by Google Cloud Run
    const port = process.env.PORT || 8080;
    await fastify.listen({ port: Number(port), host: '0.0.0.0' });

    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
