import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Exam start API called");
  if (req.method !== "POST") {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, phone, college, quizId } = req.body;

  console.log("Received exam start request with data:", req.body);

  // Basic validation with trimming to avoid empty strings with spaces
  if (!fullName || !fullName.trim() || !email || !email.trim() || !phone || !phone.trim() || !quizId || !quizId.trim()) {
    console.log("Missing or empty required fields:", { fullName, email, phone, quizId });
    return res.status(400).json({ message: "Missing or empty required fields" });
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      return res.status(500).json({ message: "Database configuration error: DATABASE_URL is not set" });
    }
    console.log("Environment variable DATABASE_URL is set");

    try {
      console.log("Checking for existing exam session");
      // Check if session already exists for given details and quizId
      const existingSession = await prisma.examSession.findFirst({
        where: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          quizId: quizId.trim(),
        },
      });
      console.log("Existing session query result:", existingSession);

      if (existingSession) {
        console.log("Existing exam session found:", existingSession.sessionId);
        return res.status(200).json({ sessionId: existingSession.sessionId });
      }

      const sessionId = nanoid(10);
      console.log("Creating exam session with sessionId:", sessionId);

      // Check if quizId exists in Quiz table
      const quizExists = await prisma.quiz.findUnique({
        where: { id: quizId.trim() },
      });

      if (!quizExists) {
        console.log("Invalid quizId: quiz does not exist", quizId);
        return res.status(400).json({ message: "Invalid quizId: quiz does not exist" });
      }

      const examSession = await prisma.examSession.create({
        data: {
          sessionId,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          college: college ? college.trim() : null,
          quizId: quizId.trim(),
        },
      });
      console.log("Exam session created:", examSession);

      return res.status(201).json({ sessionId: examSession.sessionId });
    } catch (dbError: any) {
      console.error("Database error during exam session creation:", dbError);
      if (dbError instanceof Error) {
        console.error(dbError.stack);
      }
      // Additional detailed logging
      console.error("Database error details:", {
        name: dbError.name,
        message: dbError.message,
        code: dbError.code,
        meta: dbError.meta,
        stack: dbError.stack,
      });
      return res.status(500).json({ message: dbError.message || "Database error" });
    }
  } catch (error: any) {
    console.error("Unexpected error in exam start handler:", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    console.error("Request body causing error:", req.body);
    // Additional detailed logging
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
}
