// pages/course/[id]/index.tsx
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

interface CoursePageProps {
  session: Session | null;
}

export default function CoursePage({ session }: CoursePageProps) {
  const router = useRouter();
  const { id: courseId } = router.query;

  const handleEnrollClick = () => {
    if (!courseId) return;
    router.push(`/course/${courseId}/enroll`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Your course content here */}
      
      <div className="mt-8">
        <button
          onClick={handleEnrollClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={!session}
        >
          {session ? "Enroll Now" : "Please login to enroll"}
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}