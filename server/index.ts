import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import sessionManager from './SessionManager';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Enable CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

const port = Number(process.env.PORT) || 8080;
const host = '0.0.0.0';

// Health check endpoint
fastify.get('/', async (request, reply) => {
  reply.send({ message: 'Hello from the backend!' });
});

// Fetch quizzes with their questions
fastify.get('/api/quizzes', async (request, reply) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });
    reply.send(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    reply.status(500).send({ error: 'Failed to fetch quizzes' });
  }
});

// Start a quiz session
fastify.post('/api/start-session', async (request, reply) => {
  const { email, quizId } = request.body as { email: string; quizId: number };

  try {
    if (!email || quizId === undefined) {
      return reply.status(400).send({ error: 'Missing email or quizId' });
    }

    const isCompleted = await sessionManager.hasCompleted(email, quizId);
    if (isCompleted) {
      return reply.status(403).send({ message: 'You have already completed this quiz.' });
    }

    await sessionManager.startSession(email, quizId);
    reply.send({ message: 'Session started successfully' });
  } catch (error) {
    console.error('Error in /api/start-session:', error);
    reply.status(500).send({ error: 'Failed to start session' });
  }
});

// Check session status
fastify.get('/api/check-session', async (request, reply) => {
  const { email, quizId } = request.query as { email: string; quizId: string };

  try {
    if (!email || !quizId) {
      return reply.status(400).send({ error: 'Missing email or quizId' });
    }

    const completed = await sessionManager.hasCompleted(email, Number(quizId));
    reply.send({ completed });
  } catch (error) {
    console.error('Error in /api/check-session:', error);
    reply.status(500).send({ error: 'Failed to check session' });
  }
});

// Submit quiz results
fastify.post('/api/submit-quiz', async (request, reply) => {
  const { email, quizId, score, totalQuestions } = request.body as {
    email: string;
    quizId: number;
    score: number;
    totalQuestions: number;
  };

  try {
    const isCompleted = await sessionManager.hasCompleted(email, quizId);
    if (isCompleted) {
      return reply.status(403).send({ message: 'Quiz already completed' });
    }

    await prisma.userQuizResult.create({
      data: { email, quizId, score, totalQuestions },
    });

    await sessionManager.completeSession(email, quizId);
    reply.send({ message: 'Score submitted successfully!' });
  } catch (error) {
    console.error('Error in /api/submit-quiz:', error);
    reply.status(500).send({ error: 'Failed to submit quiz score' });
  }
});

// Fetch quiz results
fastify.get('/api/quiz-results', async (request, reply) => {
  try {
    const results = await prisma.userQuizResult.findMany();
    reply.send(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    reply.status(500).send({ error: 'Failed to fetch quiz results' });
  }
});

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ error: 'Endpoint not found' });
});

// Start the server
const start = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    await fastify.listen({ port, host });
    console.log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
