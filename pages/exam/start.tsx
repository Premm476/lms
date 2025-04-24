import React, { useState } from "react";
import { useRouter } from "next/router";

const StartExam: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const quizId = "java-online-test"; // Hardcoded quizId, adjust if needed

  const handleGoHome = () => {
    router.push("/");
  };

  const isFormValid = () => {
    return fullName.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
  };

  const handleClearError = () => {
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/exam/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, phone, quizId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to start exam");
      }
      const data = await response.json();
      const sessionId = data.sessionId;
      if (!sessionId) {
        throw new Error("Invalid session ID received");
      }
      router.push(`/exam/${sessionId}`);
    } catch (err: any) {
      setError(err.message || "Error starting exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-600 text-center flex-grow">
            Start Java Online Test
          </h1>
          <button
            onClick={handleGoHome}
            className="ml-4 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Home
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={loading}
            />
          </div>
          {error && (
            <>
              <p className="text-red-500 text-sm">{error}</p>
              <button
                type="button"
                onClick={handleClearError}
                className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-gray-700 text-sm"
                disabled={loading}
              >
                Clear Error
              </button>
            </>
          )}
          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className={`w-full py-3 rounded-md font-bold text-white ${
              isFormValid() && !loading ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-300 cursor-not-allowed"
            } transition-colors duration-300`}
          >
            {loading ? "Starting Exam..." : "Start Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartExam;
