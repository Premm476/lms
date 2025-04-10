import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token, password } = req.body;

  try {
    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      return res.status(400).json({ message: "Token has expired" });
    }

    // Check if new password is same as old password
    const isSamePassword = await compare(password, resetToken.user.password || "");
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be same as old password" });
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12);

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Delete the used token
    await prisma.passwordResetToken.delete({ where: { token } });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
