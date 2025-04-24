import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

interface ExamResultData {
  examResultId: string;
  fullName: string;
  score: number;
  timeTaken: number;
  passed: boolean;
  prize: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find exam sessions matching the user details
    const examSessions = await prisma.examSession.findMany({
      where: {
        fullName,
        email,
        phone,
      },
      include: {
        examResults: true,
      },
    });

    if (examSessions.length === 0) {
      return res.status(404).json({ message: "No exam results found for the provided details" });
    }

    // Collect all exam results for these sessions
    const results: ExamResultData[] = [];
    for (const session of examSessions) {
      for (const result of session.examResults) {
        results.push({
          examResultId: result.id,
          fullName: session.fullName,
          score: result.score,
          timeTaken: result.timeTaken,
          passed: result.passed,
          prize: null, // prize not in schema, can be enhanced if stored elsewhere
        });
      }
    }

    // Sort results by score desc, time asc
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    // Fetch top 10 leaderboard overall
    const topResults = await prisma.examResult.findMany({
      orderBy: [
        { score: "desc" },
        { timeTaken: "asc" }
      ],
      take: 10,
      include: {
        examSession: true,
      },
    });

    const leaderboard = topResults.map((result) => ({
      fullName: result.examSession.fullName,
      score: result.score,
      timeTaken: result.timeTaken,
      passed: result.passed,
      prize: null,
    }));

    return res.status(200).json({
      result: results[0], // show best result for user
      leaderboard,
    });
  } catch (error) {
    console.error("Error checking exam result:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
