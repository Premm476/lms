import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { sessionId, answers } = req.body;

  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ message: "Invalid sessionId" });
  }

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ message: "Invalid answers" });
  }

  try {
    // Check if exam session exists
    const examSession = await prisma.examSession.findUnique({
      where: { sessionId },
    });

    if (!examSession) {
      return res.status(400).json({ message: "Invalid sessionId: exam session not found" });
    }

    // Fetch questions for the exam
    const questions = await prisma.question.findMany({
      where: { quizId: examSession.quizId },
      orderBy: { id: "asc" },
    });

    // Calculate score
    let score = 0;
    for (const question of questions) {
      if (answers[question.id] && answers[question.id] === question.answer) {
        score++;
      }
    }

    // Determine pass/fail: pass if score >= 80% of total questions
    const passingScore = Math.ceil(questions.length * 0.8);
    const passed = score >= passingScore;

    // Assign prize based on score or pass status
    let prize: string | null = null;
    if (passed) {
      if (score === questions.length) prize = "Gold Medal + $500";
      else if (score >= Math.ceil(questions.length * 0.9)) prize = "Silver Medal + $300";
      else if (score >= passingScore) prize = "Bronze Medal + $200";
    }

    // Save exam result without 'prize' field to satisfy Prisma schema
    const examResult = await prisma.examResult.create({
      data: {
        examSessionId: sessionId,
        score,
        timeTaken: 15 * 60, // Placeholder, should be actual time taken
        passed,
      },
    });

    return res.status(200).json({
      score,
      totalQuestions: questions.length,
      timeTaken: 15 * 60,
      passed,
      prize,
      examResultId: examResult.id,
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
