"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  role?: "STUDENT" | "INSTRUCTOR";
}

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check for success message from query params
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Registration successful! Please log in.");
    }
  }, [searchParams]);

  // Debounced email availability check
  useEffect(() => {
    const checkEmail = async () => {
      if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        try {
          const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
          if (!res.ok) throw new Error("Email check failed");
          const data = await res.json();
          setEmailAvailable(data.available);
        } catch (err) {
          setEmailAvailable(null);
          console.error("Email availability check error:", err);
        }
      }
    };
    
    const timer = setTimeout(checkEmail, 500);
    return () => clearTimeout(timer);
  }, [formData.email]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear messages when user types
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleRoleChange = (role: "STUDENT" | "INSTRUCTOR") => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email address is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (emailAvailable === false) {
      setError("Email is already registered");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters with one uppercase, number, and special character");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          agreedToTerms: formData.agreeTerms
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      // After successful registration, check for completed orders without enrollment and create enrollments
      try {
        const enrollRes = await fetch('/api/student/enroll-from-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        if (!enrollRes.ok) {
          console.error('Failed to enroll from orders');
        }
      } catch (enrollErr) {
        console.error('Error enrolling from orders:', enrollErr);
      }

      // On success, redirect to login with success state
      router.push("/login?registered=true&email=" + encodeURIComponent(formData.email));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[!@#$%^&*]/.test(formData.password)) strength += 1;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Head>
        <title>Sign Up - E-Learning Platform</title>
        <meta name="description" content="Create your account to access courses" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
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
                  height={60}
                  className="h-12 w-auto transition-transform duration-300 hover:scale-105"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {['Home', 'Courses', 'About', 'Contact'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item}
                  </motion.div>
                </Link>
              ))}
              <div className="flex items-center space-x-4">
                <Link href="/login" passHref>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup" passHref>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 space-y-3 pb-4"
            >
              {['Home', 'Courses', 'About', 'Contact'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <div className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg">
                    {item}
                  </div>
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link href="/login" passHref>
                  <div className="block py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg">
                    Login
                  </div>
                </Link>
                <Link href="/signup" passHref>
                  <div className="block py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                    Sign Up
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 sm:px-6 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <motion.h1
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Join Our Community
            </motion.h1>
            <motion.p
              className="mt-2 text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Start your learning journey today
            </motion.p>
          </div>

          <div className="p-8">

            {/* Enhanced Status Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start"
              >
                <FiAlertCircle className="mt-0.5 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start"
              >
                <FiCheckCircle className="mt-0.5 mr-3 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <p className="mt-1 text-sm text-green-700">{success}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Enhanced Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am signing up as:</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["STUDENT", "INSTRUCTOR"] as const).map((role) => (
                    <motion.button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        formData.role === role
                          ? "bg-blue-100 border-2 border-blue-500 text-blue-700 shadow-inner"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {role.charAt(0) + role.slice(1).toLowerCase()}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Enhanced Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mt-2 h-4">
                  {emailAvailable === false && (
                    <p className="text-xs text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1.5" /> Email is already registered
                    </p>
                  )}
                  {emailAvailable === true && (
                    <p className="text-xs text-green-600 flex items-center">
                      <FiCheckCircle className="mr-1.5" /> Email is available
                    </p>
                  )}
                </div>
              </div>

              {/* Enhanced Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">Password strength</span>
                    {formData.password.length >= 8 && (
                      <span className={`text-xs font-medium ${
                        passwordStrength >= 3 ? 'text-green-600' : 
                        passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {passwordStrength >= 3 ? 'Strong' : passwordStrength >= 2 ? 'Medium' : 'Weak'}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength >= 3 ? 'bg-green-500' : 
                        passwordStrength >= 2 ? 'bg-yellow-500' : 
                        passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'
                      }`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.password.length >= 8 ? (
                      'Use 8+ characters with uppercase, number & symbol'
                    ) : (
                      'Password must be at least 8 characters'
                    )}
                  </p>
                </div>
              </div>

              {/* Enhanced Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Enhanced Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </div>
            </form>

            {/* Enhanced Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => signIn("google")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
                >
                  <Image
                    src="/images/google.jpg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="ml-2">Google</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => signIn("github")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  <Image
                    src="/images/github.jpg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="ml-2">GitHub</span>
                </motion.button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/elearning.jpg.png"
                  alt="E-Learning Logo"
                  width={120}
                  height={60}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex space-x-6">
              {['Home', 'Courses', 'About', 'Contact'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
