import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error); // ✅ Now "error" is used
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
