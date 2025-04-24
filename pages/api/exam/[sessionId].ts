import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = req.query;

  if (typeof sessionId !== "string") {
    return res.status(400).json({ message: "Invalid sessionId" });
  }

  try {
    const examSession = await prisma.examSession.findUnique({
      where: { sessionId },
      include: {
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!examSession) {
      return res.status(404).json({ message: "Exam session not found" });
    }

    return res.status(200).json({
      questions: examSession.quiz.questions.slice(0, 10).map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options ? q.options.split(",") : [],
      })),
      savedAnswers: (examSession as any).answers || {},
      timeLimit: 10 * 60, // 10 minutes in seconds
      result: (examSession as any).result || null,
    });
  } catch (error) {
    console.error("Error fetching exam session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
