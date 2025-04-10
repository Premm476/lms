"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CloudComputingCourse() {
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnrollment = () => {
    setIsEnrolled(true);
    setTimeout(() => {
      router.push("/payment?course=cloud-computing&price=5999");
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-500 min-h-screen">
      <Head>
        <title>Cloud Computing Course - E-Learning</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ✅ Navbar */}
      <nav className="bg-black bg-opacity-70 p-4 fixed top-0 left-0 w-full shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-extrabold text-yellow-400">
            🚀 E-Learning
          </Link>
          <ul className="flex space-x-6">
            {[
              { name: "Home", link: "/" },
              { name: "Courses", link: "/courses" },
              { name: "About", link: "/about" },
              { name: "Contact", link: "/contact" },
              { name: "Login", link: "/login" },
              { name: "Sign Up", link: "/signup" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="text-white text-lg hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ✅ Cloud Computing Course Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white"
        >
          ☁️ Master Cloud Computing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 text-xl text-gray-200 max-w-3xl"
        >
          Learn the fundamentals of **Cloud Computing** and master **AWS, Azure, Google Cloud**
          to build, deploy, and manage cloud-based applications.
        </motion.p>
        <motion.img
          src="/images/cloud.jpg"
          alt="Cloud Computing Course"
          className="mt-8 w-[192px] h-[192px] rounded-xl shadow-2xl object-cover"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.5 }}
        />
      </section>

      {/* ✅ Course Modules */}
      <section className="bg-white text-gray-900 py-20 px-6 rounded-t-3xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-700">
          📚 Course Modules
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 container mx-auto">
          {[
            "Introduction to Cloud Computing",
            "AWS Fundamentals & Services",
            "Microsoft Azure & Virtual Machines",
            "Google Cloud Platform (GCP) Overview",
            "Cloud Security & Compliance",
            "Serverless Computing & Containers",
            "CI/CD Pipelines & DevOps Integration",
            "Deploying Scalable Cloud Applications",
          ].map((module, index) => (
            <motion.div
              key={index}
              className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg text-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              ✅ {module}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Enroll Now */}
      <section className="bg-black text-white text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-yellow-400">
          🎓 Get Started Today!
        </h2>
        <p className="mt-4 text-xl text-gray-300">
          Master Cloud Computing and become a certified cloud expert!
        </p>

        {isEnrolled ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 text-green-400 text-lg font-bold"
          >
            ✅ Enrollment Successful! Redirecting to Payment...
          </motion.div>
        ) : (
          <motion.button
            onClick={handleEnrollment}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-700 transition-all duration-300"
          >
            💳 Enroll Now for ₹5,999
          </motion.button>
        )}
      </section>
    </div>
  );
}
