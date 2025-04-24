"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ExamLeaderboard from "../../components/ExamLeaderboard";

interface ExamResultData {
  examResultId: string;
  fullName: string;
  score: number;
  timeTaken: number;
  passed: boolean;
  prize: string | null;
}

export default function CheckResult() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExamResultData | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setShowLeaderboard(false);
    if (!fullName || !email || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/exam/check-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, phone }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to fetch results.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setResult(data.result);
    } catch {
      setError("An error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-600 text-center flex-grow">
            Check Your Exam Result
          </h1>
          <button
            onClick={() => router.push("/")}
            className="ml-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-700 text-sm font-medium"
          >
            Home
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-grow flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
            >
              {loading ? "Checking..." : "Check Result"}
            </button>
            <button
              type="button"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              disabled={loading}
              className="flex-grow flex justify-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm text-yellow-500 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
            >
              {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-center text-sm mt-2" role="alert">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Best Result</h2>
            <div className="bg-yellow-50 p-4 rounded-md shadow-inner">
              <p><strong>Full Name:</strong> {result.fullName}</p>
              <p><strong>Score:</strong> {result.score}</p>
              <p><strong>Time Taken:</strong> {result.timeTaken} seconds</p>
              <p><strong>Passed:</strong> {result.passed ? "Yes" : "No"}</p>
              {result.prize && <p><strong>Prize:</strong> {result.prize}</p>}
            </div>
          </div>
        )}

        {showLeaderboard && <ExamLeaderboard />}
      </div>
    </div>
  );
}
