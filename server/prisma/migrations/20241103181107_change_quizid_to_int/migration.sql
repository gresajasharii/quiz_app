-- CreateTable
CREATE TABLE "UserQuizResult" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "UserQuizResult_pkey" PRIMARY KEY ("id")
);
