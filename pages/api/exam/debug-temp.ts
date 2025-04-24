import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Check if DATABASE_URL is set
    const databaseUrlSet = !!process.env.DATABASE_URL;

    // Test database connection by counting exam sessions
    const sessionCount = await prisma.examSession.count();

    return res.status(200).json({
      databaseUrlSet,
      sessionCount,
      message: "Debug info retrieved successfully (unauthenticated)",
    });
  } catch (error: any) {
    console.error("Debug-temp endpoint error:", error);
    return res.status(500).json({
      message: "Error retrieving debug info",
      error: error.message || error,
    });
  }
}
