"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
      <Head>
        <title>About - E-Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-200 bg-opacity-75 backdrop-blur-md z-40 transition-all duration-300 h-12 flex items-center justify-center">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo with Animation and Redirect */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/images/elearning.jpg.png"
                alt="E-Learning Logo"
                width={96}
                height={48}
                className="w-24 h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            </motion.div>
          </Link>

          {/* Hamburger Menu */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul className={`md:flex space-x-4 items-center ${isMenuOpen ? "block absolute top-12 left-0 right-0 bg-gray-200 bg-opacity-90 backdrop-blur-md py-4 px-6" : "hidden"}`}>
            {[
              { name: "Home", link: "/", type: "text" },
              { name: "Courses", link: "/courses", type: "text" },
              { name: "About", link: "/about", type: "text" },
              { name: "Contact", link: "/contact", type: "text" },
              { name: "Login", link: "/login", type: "button" },
              { name: "Sign Up", link: "/signup", type: "button" },
            ].map((item, index) => (
              <li key={index} className="my-2 md:my-0">
                {item.type === "button" ? (
                  <Link href={item.link} passHref>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button className="bg-blue-600 text-white px-4 py-1 rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-500 hover:shadow-xl active:bg-gray-500">
                        {item.name}
                      </button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link href={item.link} passHref>
                    <div className="relative">
                      <motion.span
                        style={{ 
                          color: '#1a202c', 
                          fontWeight: 'bold', 
                          display: 'block',
                          position: 'relative'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          color: "#3b82f6"
                        }}
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600">
                          <motion.span
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '0%',
                              height: '2px',
                              backgroundColor: '#3b82f6'
                            }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                      </motion.span>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center mt-20">
        <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What is <span className="text-purple-600">E-Learning?</span>
          </motion.div>
        </div>
        <div className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Unlock your programming potential with the best online courses and a supportive community.
          </motion.div>
        </div>
      </section>

      {/* About Details */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {[
          "E-Learning is your gateway to mastering programming.",
          "Our courses are affordable and designed for all skill levels.",
          "Join a supportive community and advance your career.",
          "Learn from industry experts with hands-on projects.",
          "Your dream tech career starts here, let's build it together!",
          "Get lifetime access to our courses and learn at your own pace."
        ].map((text, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-800">{text}</p>
            </motion.div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 mt-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="text-3xl font-bold">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Start Your Learning Journey Today
          </motion.div>
        </div>
        <div className="mt-2 text-lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of students and level up your skills.
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/courses" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="mt-4 bg-yellow-400 text-purple-800 font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all">
                Explore Courses
              </button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-12">
        <p>&copy; 2025 E-Learning. All Rights Reserved.</p>
      </footer>
    </div>
  );
}