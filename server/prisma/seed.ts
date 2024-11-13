/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.quiz.create({
        data: {
            title: "Quiz",
            questions: {
                create: [
                    {
                        question: "HTML is used to add styles to a webpage",
                        options: ["True", "False"],
                        correctAnswer: "False",
                    },
                    {
                        question: "JavaScript can be used both on the frontend and backend of a web application",
                        options: ["True", "False"],
                        correctAnswer: "True",
                    },
                    {
                        question: "React is a library used for building the backend of an application",
                        options: ["True", "False"],
                        correctAnswer: "False",
                    },
                    {
                        question: "CSS is a programming language",
                        options: ["True", "False"],
                        correctAnswer: "False",
                    },
                    {
                        question: "SQL is commonly used to work with databases",
                        options: ["True", "False"],
                        correctAnswer: "True",
                    },
                    {
                        question: "A client is a device or program that makes requests to a server",
                        options: ["True", "False"],
                        correctAnswer: "True",
                    },
                    {
                        question: "APIs are only used for retrieving data, not for sending data",
                        options: ["True", "False"],
                        correctAnswer: "False",
                    },
                    {
                        question: "HTML is a programming language",
                        options: ["True", "False"],
                        correctAnswer: "False",
                    },
                    {
                        question: "The frontend is the part of the website that users can see and interact with",
                        options: ["True", "False"],
                        correctAnswer: "True",
                    },
                    {
                        question: "APIs allow the frontend and backend of a web application to communicate",
                        options: ["True", "False"],
                        correctAnswer: "True",
                    }
                ],
            },
        },
    });

    // Adding user quiz result as part of the async main function
    await prisma.userQuizResult.create({
        data: {
            email: 'example@student.uni-pr.edu',
            quizId: 1,
            score: 85,
            totalQuestions: 10
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);  
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
