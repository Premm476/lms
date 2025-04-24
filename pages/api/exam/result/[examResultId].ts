import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { examResultId } = req.query;

  if (typeof examResultId !== "string") {
    return res.status(400).json({ message: "Invalid examResultId" });
  }

  try {
    const examResult = await prisma.examResult.findUnique({
      where: { id: examResultId },
      include: {
        examSession: true,
      },
    });

    if (!examResult) {
      return res.status(404).json({ message: "Exam result not found" });
    }

    return res.status(200).json({
      fullName: examResult.examSession.fullName,
      score: examResult.score,
      timeTaken: examResult.timeTaken,
      passed: examResult.passed,
      // 'prize' field omitted as it does not exist in schema
    });
  } catch (error) {
    console.error("Error fetching exam result:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
