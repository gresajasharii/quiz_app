// SessionManager.ts
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

const sessionManager = {
  // Check if the user has completed a quiz
  async hasCompleted(email: string, quizId: number): Promise<boolean> {
    const session = await prisma.quizSessions.findUnique({
      where: { email_quizId: { email, quizId } },
    });
    return session?.completed || false;
  },

  // Start a quiz session for a user
  async startSession(email: string, quizId: number): Promise<void> {
    await prisma.quizSessions.upsert({
      where: { email_quizId: { email, quizId } },
      update: { completed: false },
      create: { email, quizId, completed: false },
    });
  },

  // Mark a session as completed
  async completeSession(email: string, quizId: number): Promise<void> {
    await prisma.quizSessions.update({
      where: { email_quizId: { email, quizId } },
      data: { completed: true },
    });
  },
};

export default sessionManager;
