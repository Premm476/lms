// pages/course/[id]/enroll.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default function EnrollPage() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!courseId || status !== "idle") return;

    const enroll = async () => {
      setStatus("loading");
      setMessage("Processing enrollment...");
      
      try {
        const response = await fetch(`/api/course/${courseId}/enroll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Enrollment failed");
        }

        setStatus("success");
        setMessage("Success! Redirecting to course...");
        setTimeout(() => router.push(`/course/${courseId}`), 2000);
      } catch (error) {
        setStatus("error");
        if (isErrorWithMessage(error)) {
          setMessage(error.message);
        } else {
          setMessage("An unknown error occurred during enrollment");
        }
      }
    };

    enroll();
  }, [courseId, router, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Enrolling</h2>
            <p>{message}</p>
          </>
        )}
        {status === "success" && (
          <div className="text-green-600">
            <h2 className="text-xl font-semibold mb-4">Success!</h2>
            <p>{message}</p>
          </div>
        )}
        {status === "error" && (
          <div className="text-red-600">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${encodeURIComponent(context.resolvedUrl || '/')}`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}