import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ExamLeaderboard from "../../components/ExamLeaderboard";

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface AnswerMap {
  [questionId: string]: string;
}

interface ExamResult {
  score: number;
  timeTaken: number;
  passed?: boolean;
  prize?: string | null;
}

interface ExamSessionPageProps {
  sessionId: string;
}

export default function ExamSessionPage({ sessionId }: ExamSessionPageProps) {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ExamResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exam/${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch exam data");
        const data = await res.json();
        console.log("Fetched questions count:", data.questions.length);
        // Pad questions to 10 if less than 10
        let questions = data.questions;
        if (questions.length < 10) {
          const javaQuestions = [
            {
              id: "java-1",
              question: "What is the size of int variable in Java?",
              options: ["8 bit", "16 bit", "32 bit", "64 bit"],
            },
            {
              id: "java-2",
              question: "Which of these is a valid declaration of a char?",
              options: ["char ch = '\\u0223';", "char ch = '\\0223';", "char ch = '0223';", "char ch = 0223;"],
            },
            {
              id: "java-3",
              question: "What is the default value of a local variable?",
              options: ["null", "0", "Depends on the data type", "No default value"],
            },
            {
              id: "java-4",
              question: "Which keyword is used to inherit a class in Java?",
              options: ["this", "super", "extends", "implements"],
            },
            {
              id: "java-5",
              question: "Which of these is not a Java feature?",
              options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
            },
            {
              id: "java-6",
              question: "Which method is the entry point of a Java program?",
              options: ["main()", "start()", "run()", "init()"],
            },
            {
              id: "java-7",
              question: "Which package contains the Random class?",
              options: ["java.util", "java.lang", "java.io", "java.net"],
            },
            {
              id: "java-8",
              question: "Which of these cannot be used for a variable name in Java?",
              options: ["identifier", "keyword", "letter", "underscore"],
            },
          ];
          const dummyCount = 10 - questions.length;
          for (let i = 0; i < dummyCount; i++) {
            questions.push(javaQuestions[i]);
          }
        }
        setQuestions(questions);
        setAnswers(data.savedAnswers || {});
        setTimeLeft(data.timeLimit || 15 * 60);
        if (data.result) {
          setResult(data.result);
          setSubmitted(true);
          setTimeLeft(0);
        }
        setLoading(false);
      } catch {
        setError("Error loading exam. Please try again.");
        setLoading(false);
      }
    }
    fetchExam();
  }, [sessionId]);

  useEffect(() => {
    console.log("Current question index:", currentIndex, "Total questions:", questions.length);
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (submitted) return; // Stop timer if submitted
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, submitted]);

  const handleAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) newSet.delete(questionId);
      else newSet.add(questionId);
      return newSet;
    });
  };

  const handleSubmit = async () => {
    if (submitted) return;
    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answers }),
      });
      if (!res.ok) throw new Error("Failed to submit exam");
      const data = await res.json();
      setResult({ score: data.score, timeTaken: data.timeTaken, passed: data.passed, prize: data.prize });
      setSubmitted(true);
    } catch {
      setError("Error submitting exam. Please try again.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading exam...</div>;

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  if (submitted && result) {
    if (result.passed) {
      return <ExamLeaderboard />;
    } else {
      return (
        <div className="min-h-screen p-6 bg-yellow-50 flex flex-col items-center justify-center">
          <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">Exam Completed</h2>
            <p className="text-xl mb-2">Your Score: <span className="font-semibold">{result.score} / {questions.length}</span></p>
            <p className="text-lg mb-2">Time Taken: <span className="font-semibold">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</span></p>
            <p className="text-lg mb-4">Status: <span className="font-semibold">{result.passed ? "Passed" : "Failed"}</span></p>
            {result.prize && <p className="text-lg mb-4">Prize: <span className="font-semibold">{result.prize}</span></p>}
            <button
              onClick={() => router.push("/exam/start")}
              className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded font-bold hover:bg-yellow-700 transition"
            >
              Take Exam Again
            </button>
          </div>
        </div>
      );
    }
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) {
    return <div className="p-8 text-center text-red-600">Question data is not available.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-yellow-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-600">
            Java Online Test - Question {currentIndex + 1} of 10
          </h2>
          <div className="text-yellow-700 font-semibold">
            Time Left: {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`block p-3 border rounded cursor-pointer ${
                  answers[currentQuestion.id] === option
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() => handleAnswer(currentQuestion.id, option)}
                  className="mr-3"
                  disabled={submitted}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0 || submitted}
            className="px-4 py-2 bg-yellow-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            disabled={currentIndex === questions.length - 1 || submitted}
            className="px-4 py-2 bg-yellow-300 rounded disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={() => toggleFlag(currentQuestion.id)}
            className={`px-4 py-2 rounded ${
              flagged.has(currentQuestion.id)
                ? "bg-red-400 text-white"
                : "bg-yellow-300"
            }`}
            disabled={submitted}
          >
            {flagged.has(currentQuestion.id) ? "Unflag" : "Flag"}
          </button>
        </div>

        <div className="mt-6 flex justify-end items-center space-x-4">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="px-6 py-3 bg-yellow-600 text-white rounded font-bold hover:bg-yellow-700 transition disabled:opacity-50"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: { params: { sessionId: string } }) {
  const { sessionId } = context.params;
  return {
    props: {
      sessionId,
    },
  };
}

