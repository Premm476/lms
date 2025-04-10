"use client";
import Image from "next/image";
import Head from "next/head";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Chatbot from "./Chatbot";
import { useRouter } from "next/navigation";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    // Initial load logic can go here if needed
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/courses?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleEnroll = () => {
    router.push("/login");
  };

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 50) {
        navbar?.classList.add("shadow-xl", "backdrop-blur-lg", "bg-white/90");
      } else {
        navbar?.classList.remove("shadow-xl", "backdrop-blur-lg", "bg-white/90");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqData = [
    {
      question: "What is the difference between coding and programming?",
      answer: "Coding is the process of writing code using a programming language (e.g., Python, JavaScript, C++). It involves translating logical instructions into a syntax that a machine can understand.",
    },
    {
      question: "What are HTML and CSS?",
      answer: "HTML is the structure of a webpage. It defines the content and layout using elements like headings, paragraphs, images, and links. CSS styles the webpage and controls the layout, colors, and responsiveness.",
    },
    {
      question: "What's the difference between a designer and a developer?",
      answer: "Both designers and developers play crucial roles in building websites and apps, but they focus on different aspects of the process. Designers create the visual elements and UX, while developers code the functionality.",
    },
    {
      question: "What computer program do people use to write code?",
      answer: "Developers use code editors and IDEs (Integrated Development Environments) to write and manage their code. Popular options include VS Code, IntelliJ, and PyCharm.",
    },
  ];

  const courses = [
    { 
      id: "reactjs", 
      title: "React Js", 
      image: "/images/01.jpg", 
      price: "₹2999", 
      students: "5 Students | 4 Lectures", 
      duration: "6 Weeks",
      rating: 4.5,
      reviews: 128
    },
    { 
      id: "full-stack", 
      title: "Full Stack", 
      image: "/images/02.jpg", 
      price: "₹4999", 
      students: "2 Students | 3 Lectures", 
      duration: "12 Weeks",
      rating: 4.8,
      reviews: 215
    },
    { 
      id: "cloud-computing", 
      title: "Cloud Computing", 
      image: "/images/03.jpg", 
      price: "₹1999", 
      students: "1 Student | 3 Lectures", 
      duration: "8 Weeks",
      rating: 4.2,
      reviews: 87
    },
    { 
      id: "data-structures", 
      title: "Data Structures", 
      image: "/images/04.jpg", 
      price: "₹3999", 
      students: "15 Students | 7 Lectures", 
      duration: "10 Weeks",
      rating: 4.9,
      reviews: 342
    },
  ];

  const stats = [
    { value: "10K+", label: "Students Enrolled" },
    { value: "50+", label: "Expert Instructors" },
    { value: "100+", label: "Courses Available" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  const companyLinks = {
    "Google": "https://www.google.com",
    "Microsoft": "https://www.microsoft.com",
    "Amazon": "https://www.amazon.com",
    "IBM": "https://www.ibm.com",
    "Intel": "https://www.intel.com"
  };

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>TechSpira | E-Learning Platform</title>
        <meta name="description" content="Advance your career with TechSpira's industry-leading online courses in programming, cloud computing, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Premium Scroll Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 to-gray-300 z-50" style={{ scaleX }} />

      {/* Luxury Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-40 transition-all duration-300 h-16 flex items-center justify-center border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Animated Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image
                src="/images/elearning.jpg.png"
                alt="TechSpira Logo"
                width={120}
                height={40}
                className="transition-all duration-300 hover:scale-105"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-yellow-500 to-gray-400 bg-clip-text text-transparent">
                
              </span>
            </motion.div>
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>

          {/* Navigation Links */}
            <ul className={`md:flex space-x-6 items-center ${isMenuOpen ? "fixed top-16 left-0 right-0 bottom-0 bg-white p-6 shadow-lg flex flex-col space-y-4 overflow-y-auto" : "hidden"}`}>
            {[
              { name: "Home", link: "/", type: "text" },
              { name: "Courses", link: "/courses", type: "text" },
              { name: "About", link: "/about", type: "text" },
              { name: "Contact", link: "/contact", type: "text" },
              { name: "Login", link: "/login", type: "button" },
              { name: "Sign Up", link: "/signup", type: "button" },
            ].map((item, index) => (
              <li key={index}>
                {item.type === "button" ? (
                  <Link href={item.link}>
                    <motion.button
                      className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-300 ${
                        item.name === "Sign Up" 
                          ? "bg-gradient-to-r from-yellow-500 to-gray-400 text-white hover:shadow-lg hover:scale-105"
                          : "border border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                ) : (
                  <Link href={item.link}>
                    <motion.div
                      className="relative text-gray-700 font-medium hover:text-yellow-600 transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="relative inline-block py-2">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </motion.div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-yellow-50 to-gray-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-yellow-300 mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gray-300 mix-blend-multiply filter blur-3xl"></div>
        </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero Image - Adjusted to take less space and maintain gap */}
          <motion.div
            className="w-full lg:w-2/5 mb-10 lg:mb-0 px-4 sm:px-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/g.jpg.png"
                alt="Learning Platform"
                width={500}
                height={400}
                className="w-full h-auto object-cover transform transition-all duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-gray-400/10 pointer-events-none"></div>
            </motion.div>
          </motion.div>
          
          {/* Hero Content - Adjusted to take more space */}
          <motion.div
            className="w-full lg:w-3/5 px-4 sm:px-0"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-yellow-500 to-gray-400 bg-clip-text text-transparent">
                Transform Your Career
              </span>
              <br />
              <span className="text-gray-800">With TechSpira</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Master in-demand tech skills with our industry-recognized courses. Learn from experts and build real-world projects.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <motion.button
                onClick={handleEnroll}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-gray-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Enroll Now
              </motion.button>
            </div>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-2xl font-bold text-yellow-500">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">TRUSTED BY LEADING COMPANIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {Object.entries(companyLinks).map(([company, url], index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-gray-700"
              >
                {company}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Program Highlights */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-yellow-50 to-gray-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/reactbanner.jpg"
            alt="Learning background"
            width={1920}
            height={1080}
            priority
            className="opacity-10 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80"></div>
          
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-300/10"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() * 40) - 20],
                x: [0, (Math.random() * 30) - 15],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1.5 text-sm font-medium text-yellow-600 bg-yellow-100 rounded-full mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              WHY CHOOSE US
            </motion.span>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              World-Class <span className="text-yellow-600">Learning Experience</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We combine cutting-edge curriculum with industry expertise to deliver exceptional results.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Industry-Relevant Curriculum",
                description: "Courses designed with direct input from tech leaders to ensure you learn the most in-demand skills.",
                stats: "Updated quarterly with 100+ industry partners",
                progress: 95,
                image: "/images/ai.jpg",
                color: "text-yellow-600",
                bgColor: "bg-yellow-100",
              },
              {
                title: "Expert Instructors",
                description: "Learn from professionals working at top tech companies with years of practical experience.",
                stats: "50+ instructors with 10+ years experience",
                progress: 98,
                image: "/images/block.jpg",
                color: "text-gray-600",
                bgColor: "bg-gray-100",
              },
              {
                title: "Hands-On Projects",
                description: "Build portfolio-worthy projects that demonstrate your skills to potential employers.",
                stats: "5-10 projects per course with code reviews",
                progress: 92,
                image: "/images/cloud.jpg",
                color: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                title: "Flexible Learning",
                description: "Study at your own pace with 24/7 access to course materials and resources.",
                stats: "95% course completion rate",
                progress: 95,
                image: "/images/cyber.jpg",
                color: "text-orange-600",
                bgColor: "bg-orange-100",
              },
              {
                title: "Career Support",
                description: "Get resume reviews, interview prep, and job search assistance from our career team.",
                stats: "85% job placement within 6 months",
                progress: 85,
                image: "/images/data.jpg",
                color: "text-red-600",
                bgColor: "bg-red-100",
              },
              {
                title: "Community Network",
                description: "Join an exclusive community of learners and professionals for networking and support.",
                stats: "10,000+ active members",
                progress: 100,
                image: "/images/dsa.jpg",
                color: "text-indigo-600",
                bgColor: "bg-indigo-100",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-yellow-200 transition-all duration-300 group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(234, 179, 8, 0.1), 0 10px 10px -5px rgba(234, 179, 8, 0.04)"
                }}
              >
                {/* Progress Ribbon */}
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                  {item.progress}% Success
                </div>
                
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-${item.bgColor.split('-')[1]}-100/10`}></div>
                </div>
                
                <div className="p-6">
                  <div className={`w-12 h-12 ${item.bgColor} ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 001.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {index === 5 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{item.stats}</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full ${index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-500' : 
                        index === 2 ? 'bg-green-500' : 
                        index === 3 ? 'bg-orange-500' : 
                        index === 4 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                      style={{width: `${item.progress}%`}}
                    ></div>
                  </div>
                  
                  <motion.button
                    className="w-full mt-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-600 bg-yellow-100 rounded-full mb-4">
              POPULAR COURSES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Expand Your <span className="text-yellow-600">Knowledge</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our most popular courses and start your learning journey today.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Link href={`/${course.id}`} passHref>
                  <div>
                    <div className="relative">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transform transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Popular
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {course.duration}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-500">
                            ({course.reviews})
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{course.students}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/login");
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-gray-400 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Enroll Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <motion.button
                className="px-8 py-3 bg-white text-yellow-600 font-medium rounded-lg border border-yellow-600 hover:bg-yellow-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Courses
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
              STUDENT SUCCESS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transformative <span className="text-blue-600">Learning Experiences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who have accelerated their careers with TechSpira
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "TechSpira's Full Stack course transformed my career. I went from zero coding experience to landing a developer job in 6 months!",
                name: "Prem M",
                role: "Full Stack Developer",
                company: "TechSpira",
                avatar: "/images/prem.jpg.png",
                rating: 5,
              },
              {
                quote: "The instructors are phenomenal. Their real-world experience shines through in every lesson. Worth every penny!",
                name: "Vidhya",
                role: "Cloud Engineer",
                company: "AWS",
                avatar: "/images/vidhya.jpg.png",
                rating: 4.5,
              },
              {
                quote: "I tried other platforms before, but TechSpira's project-based approach is what made everything click for me.",
                name: "Niteesh",
                role: "Frontend Developer",
                company: "Microsoft",
                avatar: "/images/nitesh.jpg",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>

                <div className="relative">
                  <svg
                    className="w-8 h-8 text-gray-200 absolute -top-2 -left-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 italic pl-6">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
              HAVE QUESTIONS?
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform and courses.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 bg-white text-left"
                  onClick={() => toggleAnswer(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                  <svg
                    className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${openIndex === index ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  id={`faq-${index}`}
                  className={`overflow-hidden ${openIndex === index ? "max-h-96" : "max-h-0"}`}
                  initial={{ height: 0 }}
                  animate={{ height: openIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 bg-white border-t border-gray-100">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions? We're here to help!</p>
            <Link href="/contact">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white mix-blend-overlay filter blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have accelerated their careers with TechSpira.
            </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleEnroll}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Speak to an Advisor
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center mb-6">
                <Image 
                  src="/images/elearning.jpg.png" 
                  alt="TechSpira Logo" 
                  width={160} 
                  height={40}
                  style={{ width: 'auto' }}
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering the next generation of tech professionals through
                immersive learning experiences and industry-relevant curriculum.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Popular Courses</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/course/full-stack" className="text-gray-400 hover:text-white transition-colors">
                    Full Stack Development
                  </Link>
                </li>
                <li>
                  <Link href="/course/data-science" className="text-gray-400 hover:text-white transition-colors">
                    Data Science & AI
                  </Link>
                </li>
                <li>
                  <Link href="/course/cloud" className="text-gray-400 hover:text-white transition-colors">
                    Cloud Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/course/devops" className="text-gray-400 hover:text-white transition-colors">
                    DevOps & CI/CD
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                  <span>info@techspira.com</span>
                </li>
                <li className="flex items-start">
                  <FaPhone className="mt-1 mr-3 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                  <span>123 Tech Street, San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TechSpira. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot with WhatsApp Integration */}
      <Chatbot />
    </div>
  );
}