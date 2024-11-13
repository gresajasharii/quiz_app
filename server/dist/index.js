import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import sessionManager from './SessionManager.js';
import cors from '@fastify/cors';
const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();
fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
});
// Endpoint to fetch quizzes
fastify.get('/api/quizzes', async (request, reply) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: { questions: true },
        });
        console.log('Quizzes fetched successfully:', quizzes);
        return quizzes;
    }
    catch (error) {
        console.error('Error fetching quizzes:', error);
        reply.status(500).send({ error: 'Failed to fetch quizzes' });
    }
});
// Endpoint to start a quiz session
fastify.post('/api/start-session', async (request, reply) => {
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
// Endpoint to check session status
fastify.get('/api/check-session', async (request, reply) => {
    const { email, quizId } = request.query;
    if (!email || !quizId) {
        console.log('Missing email or quizId:', { email, quizId });
        return reply.status(400).send({ error: 'Missing email or quizId' });
    }
    console.log(`Checking session for email=${email}, quizId=${quizId}`);
    const completed = sessionManager.hasCompleted(email, Number(quizId));
    reply.send({ completed });
});
// Endpoint to submit quiz results
fastify.post('/api/submit-quiz', async (request, reply) => {
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
        reply.send({ message: 'Score submitted successfully!', result });
    }
    catch (error) {
        console.error('Error submitting quiz result:', error);
        reply.status(500).send({ error: 'Failed to submit quiz score' });
    }
});
// Endpoint to fetch quiz results
fastify.get('/api/quiz-results', async (request, reply) => {
    try {
        const results = await prisma.userQuizResult.findMany();
        console.log('Quiz results fetched successfully:', results);
        return results;
    }
    catch (error) {
        console.error('Error fetching quiz results:', error);
        reply.status(500).send({ error: 'Failed to fetch quiz results' });
    }
});
const start = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
        await fastify.listen({ port: 5000 });
        console.log('Server running on http://localhost:5000');
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};
start();
