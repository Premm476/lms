import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const databaseUrlSet = !!process.env.DATABASE_URL;
    const sessionCount = await prisma.examSession.count();

    return res.status(200).json({
      databaseUrlSet,
      sessionCount,
      message: "Debug info retrieved successfully",
    });
  } catch (error: any) {
    console.error("Debug endpoint error:", error);
    return res.status(500).json({
      message: "Error retrieving debug info",
      error: error.message || error,
    });
  }
}
