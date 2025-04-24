"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'; // Import Link from next/link

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    console.log("DashboardIndex useEffect - session:", session);
    console.log("DashboardIndex useEffect - user role:", session?.user?.role);

    if (!session) {
      router.push("/login");
      return;
    }

    switch (session.user?.role) {
      case "STUDENT":
        router.push("/dashboard/student");
        break;
      case "INSTRUCTOR":
        router.push("/dashboard/instructor");
        break;
      case "ADMIN":
        router.push("/dashboard/admin");
        break;
      default:
        router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link href="/dashboard/student/notifications">Notifications</Link></li>
          <li><Link href="/dashboard/student/settings">Settings</Link></li>
          <li><Link href="/dashboard/student/leaderboard">Leaderboard</Link></li>
          <li><Link href="/dashboard/student/saved">Saved Resources</Link></li>
          <li><Link href="/dashboard/student/forums">Forums</Link></li>
          <li><Link href="/dashboard/student/messages">Messages</Link></li>
          <li><Link href="/dashboard/student/calendar">Calendar</Link></li>
          <li><Link href="/dashboard/student/support">Feedback / Support</Link></li>
        </ul>
      </nav>
    </div>
  );
}

DashboardIndex.auth = {
  required: true,
  loading: (
    <div className="flex items-center justify-center min-h-screen">Loading...</div>
  ),
  unauthorized: "/login",
};
