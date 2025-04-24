import React from 'react';
import { useSession } from 'next-auth/react';

export default function DebugSession() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading session...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-screen">No active session found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Session Data</h1>
      <pre className="bg-gray-100 p-4 rounded border overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
