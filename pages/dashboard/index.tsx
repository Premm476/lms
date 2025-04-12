import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import StudentDashboard from './student/StudentDashboard';

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.replace('/login');
      return;
    }

    switch (session.user?.role) {
      case 'STUDENT':
        router.replace('/dashboard/student');
        break;
      case 'INSTRUCTOR':
        router.replace('/dashboard/instructor');
        break;
      case 'ADMIN':
        router.replace('/dashboard/admin');
        break;
      default:
        router.replace('/login');
    }
  }, [session, status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <StudentDashboard />
    </div>
  );
}

DashboardIndex.auth = {
  required: true,
  loading: <div className="flex items-center justify-center min-h-screen">Loading...</div>,
  unauthorized: '/login'
};
