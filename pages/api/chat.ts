// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Predefined responses for LMS-related queries
const lmsResponses: Record<string, string> = {
  courses: "We offer a variety of courses! You can check them out on our Courses page.",
  pricing: "Our LMS provides flexible pricing plans. Visit the Pricing page for details.",
  payment: "We accept payments through Razorpay, supporting UPI, credit/debit cards, and net banking.",
  auth: "We use Clerk for authentication, ensuring a secure login and signup process.",
  chat: "This AI chatbot is here to help you with any queries related to our LMS platform.",
  features: "Our LMS platform includes real-time chat, a leaderboard, and an online code editor.",
  support: "You can reach out to our support team anytime for assistance with your account or courses.",
  hi: "Hello! 😊 How can I assist you with the LMS platform today?",
  hello: "Hey there! 👋 Need help with anything related to our LMS?",
  hey: "Hi! 👋 What can I do for you today?",
  "how are you": "I'm just a chatbot, but I'm feeling great! 😃 How can I assist you today?",
  "how's it going": "Everything's running smoothly! 🚀 What can I help you with?",
  "where is your branch": "Our LMS platform is fully online! 🌍 You can access it anytime, anywhere.",
  location: "We operate digitally and are accessible worldwide! 🌎 No physical branches, just seamless learning online.",
  "course content": "Our courses include video lectures, quizzes, assignments, and hands-on projects.",
  certification: "Yes, we provide certificates upon course completion. You can download them from your dashboard.",
  "refund policy": "We offer a 30-day money-back guarantee if you're not satisfied with the course.",
  "system requirements": "You only need a modern browser and a stable internet connection to access our platform.",
  "contact support": "You can contact our support team at support@lmsplatform.com or through the Help Center.",
  leaderboard: "The leaderboard shows the top performers in each course. Check it out to see where you stand!",
  "code editor": "Our built-in code editor supports multiple programming languages and provides real-time feedback.",
  "course duration": "Course durations vary, but most courses are designed to be completed in 4-6 weeks.",
  instructors: "Our instructors are industry experts with years of experience in their respective fields.",
  "free trial": "Yes, we offer a 7-day free trial for all our courses. Sign up to get started!",
  "course updates": "We regularly update our courses to include the latest industry trends and technologies.",
  "group discounts": "We offer group discounts for teams and organizations. Contact sales@lmsplatform.com for details.",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "Invalid message input" });
  }

  const lowerMessage = message.toLowerCase();

  // Check for predefined LMS responses
  for (const key in lmsResponses) {
    if (lowerMessage.includes(key)) {
      return res.status(200).json({ reply: lmsResponses[key] });
    }
  }

  try {
    // AI Chatbot API (Hugging Face)
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Use environment variable
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from Hugging Face API");
    }

    const data = await response.json();
    const reply = data?.generated_text || data?.[0]?.generated_text || "I'm here to assist you! Feel free to ask me anything about our LMS platform.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return res.status(500).json({
      reply: "Oops! Something went wrong. Please try again later or ask about the LMS platform.",
    });
  }
}