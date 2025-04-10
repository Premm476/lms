"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiAlertCircle, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Check for registration success message
  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      const email = searchParams.get("email");
      if (email) {
        setRegisteredEmail(decodeURIComponent(email));
        setFormData(prev => ({ ...prev, email: decodeURIComponent(email) }));
      }
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: searchParams?.get("callbackUrl") || "/dashboard"
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", link: "/", type: "text" },
    { name: "Courses", link: "/courses", type: "text" },
    { name: "About", link: "/about", type: "text" },
    { name: "Contact", link: "/contact", type: "text" },
    { name: "Login", link: "/login", type: "button" },
    { name: "Sign Up", link: "/signup", type: "button" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 min-h-screen">
      <Head>
        <title>Login - E-Learning Platform</title>
        <meta name="description" content="Login to access your courses and learning materials" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-40 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
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
                className="w-24 h-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
                priority
              />
            </motion.div>
          </Link>

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <ul className={`md:flex space-x-6 items-center ${isMenuOpen ? "block absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md py-4 px-6 shadow-md" : "hidden"}`}>
            {navItems.map((item, index) => (
              <li key={index} className="my-2 md:my-0">
                {item.type === "button" ? (
                  <Link href={item.link} passHref legacyBehavior>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium shadow-sm transition-all duration-200">
                        {item.name}
                      </button>
                    </motion.a>
                  </Link>
                ) : (
                  <Link href={item.link} passHref legacyBehavior>
                    <motion.a
                      className="relative block text-gray-700 font-medium hover:text-blue-700 transition-colors"
                      whileHover={{ scale: 1.03 }}
                    >
                      {item.name}
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 pt-28 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className="mt-2 text-gray-600 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Please enter your credentials to login
            </motion.p>
          </div>

          {/* Status Messages */}
          {registeredEmail && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-start text-sm"
            >
              <FiCheckCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <span>Registration successful! Please log in with your email.</span>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start text-sm"
            >
              <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>

              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </Link>
            </div>

            <div>
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : "Sign in"}
              </motion.button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">Or login with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => signIn("google")}
                className="w-full inline-flex justify-center items-center py-2 px-3 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
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
                className="w-full inline-flex justify-center items-center py-2 px-3 border border-gray-800 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
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
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} E-Learning. All Rights Reserved.</p>
      </footer>
    </div>
  );
}