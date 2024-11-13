/*
  Warnings:

  - You are about to drop the column `userId` on the `UserQuizResult` table. All the data in the column will be lost.
  - Added the required column `email` to the `UserQuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultStatus` to the `UserQuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestions` to the `UserQuizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserQuizResult" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "resultStatus" TEXT NOT NULL,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;
