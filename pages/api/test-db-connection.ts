import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simple query to test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: "Database connection successful" });
  } catch (error: any) {
    console.error("Database connection test failed:", error);
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
}
