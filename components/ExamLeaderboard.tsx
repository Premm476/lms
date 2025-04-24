import React, { useEffect, useState } from "react";

interface LeaderboardEntry {
  fullName: string;
  score: number;
  timeTaken: number;
  passed: boolean;
  prize?: string | null;
  examResultId?: string;
}

export default function ExamLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [resultDetails, setResultDetails] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/exam/leaderboard");
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        setLeaderboard(data.leaderboard);
        setLoading(false);
      } catch {
        setError("Error loading leaderboard");
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    async function fetchResultDetails() {
      if (!selectedResultId) {
        setResultDetails(null);
        return;
      }
      try {
        const res = await fetch(`/api/exam/result/${selectedResultId}`);
        if (!res.ok) throw new Error("Failed to fetch result details");
        const data = await res.json();
        setResultDetails(data);
      } catch {
        setError("Error loading result details");
      }
    }
    fetchResultDetails();
  }, [selectedResultId]);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Exam Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-yellow-100">
            <th className="border-b p-3">Name</th>
            <th className="border-b p-3">Score</th>
            <th className="border-b p-3">Time</th>
            <th className="border-b p-3">Passed</th>
            <th className="border-b p-3">Prize</th>
            <th className="border-b p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={idx} className="border-b hover:bg-yellow-50">
              <td className="p-3 font-semibold">{entry.fullName}</td>
              <td className="p-3">{entry.score}</td>
              <td className="p-3">{Math.floor(entry.timeTaken / 60)}m {entry.timeTaken % 60}s</td>
              <td className={`p-3 font-bold ${entry.passed ? "text-green-600" : "text-red-600"}`}>
                {entry.passed ? "Yes" : "No"}
              </td>
              <td className="p-3 text-yellow-700 font-semibold">{entry.prize || "-"}</td>
              <td className="p-3">
                {entry.examResultId ? (
                  <button
                    onClick={() => setSelectedResultId(entry.examResultId!)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                  >
                    View Result
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {resultDetails && (
        <div className="mt-6 p-4 border rounded bg-yellow-50 shadow">
          <h3 className="text-xl font-bold mb-2">Exam Result Details</h3>
          <p><strong>Name:</strong> {resultDetails.fullName}</p>
          <p><strong>Score:</strong> {resultDetails.score}</p>
          <p><strong>Time Taken:</strong> {Math.floor(resultDetails.timeTaken / 60)}m {resultDetails.timeTaken % 60}s</p>
          <p><strong>Status:</strong> <span className={resultDetails.passed ? "text-green-600" : "text-red-600"}>{resultDetails.passed ? "Passed" : "Failed"}</span></p>
          <p><strong>Prize:</strong> {resultDetails.prize || "None"}</p>
          <button
            onClick={() => setSelectedResultId(null)}
            className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
