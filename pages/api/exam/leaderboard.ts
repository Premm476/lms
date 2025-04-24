import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Use type assertion to any to bypass TS error on examResult property
    const topResults = await (prisma as any).examResult.findMany({
      orderBy: [
        { score: "desc" },
        { timeTaken: "asc" }
      ],
      take: 10,
      include: {
        examSession: true,
      },
    });

    const leaderboard = topResults.map((result: any) => ({
      fullName: result.examSession.fullName,
      score: result.score,
      timeTaken: result.timeTaken,
      passed: result.passed,
      prize: result.prize,
    }));

    return res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
