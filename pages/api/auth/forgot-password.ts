import prisma from "lib/prisma";
import { generateToken } from "lib/tokens";
import { sendPasswordResetEmail } from "lib/email";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({ message: "If this email exists, you'll receive a reset link" });
    }

    // Generate reset token (expires in 1 hour)
    const token = generateToken();
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // First check if a token exists for this user
    const existingToken = await prisma.passwordResetToken.findFirst({
      where: { userId: user.id },
    });

    if (existingToken) {
      // Update existing token using the token value as unique identifier
      await prisma.passwordResetToken.update({
        where: { token: existingToken.token },
        data: { token, expires },
      });
    } else {
      // Create new token
      await prisma.passwordResetToken.create({
        data: {
          token,
          expires,
          userId: user.id,
        },
      });
    }

    // Construct full reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    
    // Send email with complete reset link
    try {
      await sendPasswordResetEmail(user.email, resetUrl);
      console.log('Password reset email sent to:', user.email);
      console.log('Password reset link:', resetUrl);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      throw emailError;
    }

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
