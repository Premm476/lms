"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX, FiStar, FiClock, FiUser, FiCheckCircle } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

// Types
export type Course = {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  rating: number;
  instructor: string;
  category: string;
  description: string;
  isFeatured?: boolean;
  isBookmarked?: boolean;
};

// Course Data
export const coursesData: Course[] = [
  {
    id: "reactjs",
    title: "React JS Masterclass",
    image: "/images/01.jpg",
    price: 2999,
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.8,
    instructor: "Sarah Johnson",
    category: "Web Development",
    description: "Master React JS with hooks, context API, and advanced patterns. Build real-world applications with our project-based curriculum.",
    isFeatured: true
  },
  {
    id: "full-stack",
    title: "Full Stack Development",
    image: "/images/02.jpg",
    price: 4999,
    duration: "12 Weeks",
    level: "Advanced",
    rating: 4.9,
    instructor: "Michael Chen",
    category: "Web Development",
    description: "Become a full-stack developer with MERN stack (MongoDB, Express, React, Node). Includes authentication, deployment, and testing."
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Fundamentals",
    image: "/images/03.jpg",
    price: 1999,
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.5,
    instructor: "David Wilson",
    category: "Cloud",
    description: "Learn AWS, Azure, and GCP fundamentals. Hands-on labs with real cloud environments."
  },
  {
    id: "data-structures",
    title: "Data Structures & Algorithms",
    image: "/images/04.jpg",
    price: 3999,
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.7,
    instructor: "Emily Rodriguez",
    category: "Computer Science",
    description: "Master essential algorithms and data structures for technical interviews and competitive programming."
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    image: "/images/05.jpg",
    price: 4999,
    duration: "10 Weeks",
    level: "Advanced",
    rating: 4.9,
    instructor: "Dr. Robert Taylor",
    category: "Artificial Intelligence",
    description: "From fundamentals to advanced neural networks. Includes TensorFlow and PyTorch implementations.",
    isFeatured: true
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    image: "/images/06.jpg",
    price: 1999,
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.6,
    instructor: "Lisa Wong",
    category: "Data Science",
    description: "Learn Python for data analysis, visualization, and basic machine learning with real datasets."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Essentials",
    image: "/images/07.jpg",
    price: 3999,
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.7,
    instructor: "James Peterson",
    category: "Security",
    description: "Ethical hacking, penetration testing, and security best practices for modern applications."
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3 Development",
    image: "/images/08.jpg",
    price: 1999,
    duration: "5 Weeks",
    level: "Intermediate",
    rating: 4.5,
    instructor: "Alex Morgan",
    category: "Blockchain",
    description: "Build decentralized applications with Solidity, Ethereum, and smart contracts."
  },
  {
    id: "robotics",
    title: "Robotics & Automation",
    image: "/images/09.jpg",
    price: 3999,
    duration: "10 Weeks",
    level: "Advanced",
    rating: 4.8,
    instructor: "Dr. Sophia Lee",
    category: "Engineering",
    description: "Learn ROS (Robot Operating System) and build autonomous systems with hands-on projects."
  },
];

// Categories for filtering
const categories = [
  "All",
  "Web Development",
  "Artificial Intelligence",
  "Data Science",
  "Cloud",
  "Security",
  "Blockchain",
  "Engineering"
];

export default function Courses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData);
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on search query and category
  useEffect(() => {
    let results = coursesData;
    
    if (query) {
      results = results.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      results = results.filter(course => course.category === selectedCategory);
    }
    
    setFilteredCourses(results);
  }, [query, selectedCategory]);

  // Handle search functionality
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("query", searchTerm);
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    router.push(`/courses?${params.toString()}`);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("query", searchTerm);
    if (category !== "All") params.set("category", category);
    router.push(`/courses?${params.toString()}`);
  };

  // Toggle bookmark
  const toggleBookmark = (courseId: string) => {
    setFilteredCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  };

  // Handle enrollment (redirect to login page)
  const handleEnrollment = (courseId: string) => {
    router.push(`/login?redirect=/course/${courseId}/enroll`);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Courses - E-Learning Platform</title>
        <meta name="description" content="Browse our extensive catalog of professional courses in technology, business, and more." />
        <meta name="keywords" content="online courses, e-learning, programming, web development, data science" />
        <meta property="og:title" content="Professional Courses - E-Learning Platform" />
        <meta property="og:description" content="Enhance your skills with our industry-relevant courses" />
        <meta property="og:image" content="/images/og-courses.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/elearning.jpg.png"
                  alt="E-Learning Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" passHref className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
              <Link href="/courses" passHref className="text-blue-600 font-medium">Courses</Link>
              <Link href="/about" passHref className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link href="/contact" passHref className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
              
              <div className="flex space-x-4">
                <Link href="/login" passHref>
                  <motion.button
                    className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup" passHref>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                <Link href="/" passHref className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Home</Link>
                <Link href="/courses" passHref className="block px-3 py-2 rounded-md text-blue-600 bg-blue-50">Courses</Link>
                <Link href="/about" passHref className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">About</Link>
                <Link href="/contact" passHref className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Contact</Link>
                <div className="pt-2 border-t border-gray-200">
                  <Link href="/login" passHref className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link href="/signup" passHref className="block px-3 py-2 mt-2 rounded-md bg-blue-600 text-white text-center">Sign Up</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Advance Your Career with Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-8"
            >
              Join thousands of students learning in-demand skills from industry experts
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="#courses" passHref>
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                  Browse Courses
                </button>
              </Link>
              <Link href="/signup" passHref>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                  Start Learning Free
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Box */}
            <div className="relative mb-8">
              <div className="flex shadow-lg rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 p-4 pr-12 outline-none text-gray-700"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      } transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {selectedCategory === "All" ? "All Courses" : `${selectedCategory} Courses`}
              <span className="text-gray-500 text-lg ml-2">({filteredCourses.length})</span>
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredCourses.length} of {coursesData.length} courses
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                >
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(course.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={course.isBookmarked ? "Remove bookmark" : "Bookmark this course"}
                  >
                    {course.isBookmarked ? (
                      <FaBookmark className="text-blue-600" size={18} />
                    ) : (
                      <FaRegBookmark className="text-gray-400" size={18} />
                    )}
                  </button>

                  {/* Featured Badge */}
                  {course.isFeatured && (
                    <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Course Image */}
                  <Link href={`/${course.id}`} passHref>
                    <div className="relative h-48 w-full cursor-pointer">
                      <Image
                        src={course.image}
                        alt={course.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 hover:opacity-90"
                      />
                    </div>
                  </Link>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FiClock className="mr-1" size={14} />
                        {course.duration}
                      </span>
                    </div>

                    <Link href={`/${course.id}`} passHref>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <FiStar className="text-yellow-400 mr-1" size={16} />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <FiUser className="text-gray-400 mr-1" size={16} />
                          <span className="text-sm text-gray-500">{course.instructor}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {course.level}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <button
                          onClick={() => router.push(`/course/${course.id}/payment`)}
                          className="text-2xl font-bold text-gray-800 underline hover:text-blue-600"
                        >
                          ₹5
                        </button>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{course.price}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEnrollment(course.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FiCheckCircle className="mr-2" size={16} />
                        Enroll
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  router.push("/courses");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-gray-800 rounded-xl p-8 md:p-12 text-white mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start learning?</h2>
            <p className="text-lg mb-8">Join our community of over 100,000 learners worldwide.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" passHref>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                  Get Started for Free
                </button>
              </Link>
              <Link href="/courses" passHref>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-800 transition-colors">
                  Browse All Courses
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">E-Learning</h3>
              <p className="text-gray-400">Empowering learners worldwide with quality education since 2015.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" passHref className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/courses" passHref className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/about" passHref className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" passHref className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.filter(c => c !== "All").map(category => (
                  <li key={category}>
                    <button 
                      onClick={() => handleCategoryChange(category)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                <p>123 Learning St.</p>
                <p>Education City, EC 12345</p>
                <p className="mt-2">Email: info@elearning.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} E-Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}