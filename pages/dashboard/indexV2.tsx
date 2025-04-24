"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StudentDashboard from "./student/StudentDashboard";

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <StudentDashboard />
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
