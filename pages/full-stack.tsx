"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FullStackCourse() {
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnrollment = () => {
    setIsEnrolled(true);
    setTimeout(() => {
      router.push("/payment?course=fullstack&price=4999");
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-green-700 via-blue-700 to-purple-500 min-h-screen">
      <Head>
        <title>Full Stack Development Course - E-Learning</title>
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

      {/* ✅ Full Stack Course Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white"
        >
          🌍 Master Full Stack Development
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 text-xl text-gray-200 max-w-3xl"
        >
          Become a full-stack developer by mastering **frontend & backend** technologies.
          Learn **React.js, Node.js, Express, MongoDB**, and build real-world applications!
        </motion.p>
        <motion.img
          src="\images\fullstack.jpg"
          alt="Full Stack Course"
          className="mt-8 w-[192px] h-[192px] rounded-xl shadow-2xl object-cover"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.5 }}
        />
      </section>

      {/* ✅ Course Modules */}
      <section className="bg-white text-gray-900 py-20 px-6 rounded-t-3xl">
        <h2 className="text-4xl font-extrabold text-center text-green-700">
          📚 Course Modules
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 container mx-auto">
          {[
            "HTML, CSS & JavaScript Fundamentals",
            "Frontend with React.js & Tailwind CSS",
            "Backend with Node.js & Express",
            "Database Management with MongoDB & PostgreSQL",
            "Authentication with JWT & OAuth",
            "RESTful APIs & GraphQL",
            "Deploying Apps with AWS & Firebase",
            "Building Full-Stack Projects",
          ].map((module, index) => (
            <motion.div
              key={index}
              className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-lg text-center"
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
          Master Full Stack Development and become an industry-ready developer!
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
            💳 Enroll Now for ₹4,999
          </motion.button>
        )}
      </section>
    </div>
  );
}
