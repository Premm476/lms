"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotPage() {
  const [mode, setMode] = useState<"chat" | "whatsapp">("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([]);
  const [inputValue, setInputValue] = useState("");

  // Sample knowledge base with 20 questions and professional, rich answers including casual greetings
  const lmsKnowledgeBase = [
    { question: /^hi$|^hello$|^hey$|^good morning$|^good afternoon$|^good evening$/i, answer: "Hello! How can I assist you with TechSpira today? Feel free to ask any questions about our courses, enrollment, or platform." },
    { question: /what is techspira/i, answer: "TechSpira is a comprehensive learning management system offering a wide range of courses in technology, data science, AI, and more, designed to help you upskill and advance your career." },
    { question: /how do i enroll in a course/i, answer: "To enroll in a course, simply visit the Courses page, select your desired course, and click the 'Enroll Now' button. You will be guided through the registration and payment process." },
    { question: /what courses are available/i, answer: "We offer courses in Web Development, Data Science, Artificial Intelligence, Cybersecurity, Cloud Computing, Robotics, Blockchain, and more. Check the Courses page for detailed syllabi and schedules." },
    { question: /are the courses self-paced/i, answer: "Most of our courses are self-paced, allowing you to learn at your own convenience. Some courses may include live sessions or instructor-led components." },
    { question: /how long do courses take to complete/i, answer: "Course durations vary, typically ranging from 4 to 12 weeks depending on the subject and depth. You can view estimated completion times on each course's overview page." },
    { question: /do you provide certificates/i, answer: "Yes, upon successful completion of a course, you will receive a digital certificate that you can download and share on professional platforms like LinkedIn." },
    { question: /can i access courses on mobile/i, answer: "Absolutely! TechSpira is optimized for all devices including smartphones and tablets, so you can learn anytime, anywhere." },
    { question: /how do i reset my password/i, answer: "If you forgot your password, click the 'Forgot Password' link on the login page and follow the instructions to reset it via your registered email." },
    { question: /is there a refund policy/i, answer: "We offer a 7-day refund policy for most paid courses if you have completed less than 20% of the content. Please contact support for assistance." },
    { question: /how can i contact support/i, answer: "You can reach our support team via the chatbot, email at support@techspira.com, or through WhatsApp support available in the chatbot interface." },
    { question: /can i switch courses after enrolling/i, answer: "Yes, you can switch courses within the first 20% of course completion. Contact support to assist with the switch." },
    { question: /do you offer group discounts/i, answer: "We provide group discounts for teams of 5 or more. Please contact our sales team for detailed pricing and offers." },
    { question: /how do i track my progress/i, answer: "Your dashboard displays your progress for each enrolled course, including completed lessons, quizzes, and overall percentage." },
    { question: /are there quizzes and assignments/i, answer: "Yes, all courses include interactive quizzes and assignments to reinforce your learning and assess your understanding." },
    { question: /can i download course materials/i, answer: "You can download PDFs and supplementary materials where available. Video downloads may be limited based on course policies." },
    { question: /do you have live sessions/i, answer: "Some courses include live instructor sessions and Q&A webinars. Check the course details for live session schedules." },
    { question: /how do i communicate with instructors/i, answer: "You can message instructors through the course dashboard or participate in discussion forums for each course." },
    { question: /is there a community for learners/i, answer: "Yes, join our Discord server and course-specific forums to connect with fellow learners and mentors." },
    { question: /what payment methods are accepted/i, answer: "We accept payments via credit/debit cards, UPI, net banking, and PayPal through our secure checkout." },
    { question: /can i get a refund if i am not satisfied/i, answer: "Refunds are available within 7 days of purchase if less than 20% of the course is completed. Contact support to initiate a refund." },
    { question: /how do i update my profile information/i, answer: "Go to your Profile page to update your personal details, contact information, and preferences." },
    { question: /do you offer scholarships or financial aid/i, answer: "We occasionally offer scholarships and financial aid. Keep an eye on announcements or contact support for current opportunities." },
    { question: /can i pause and resume courses/i, answer: "Yes, your progress is saved automatically, so you can pause and resume courses anytime." },
    { question: /how do i get help with technical issues/i, answer: "For technical support, use the chatbot, email support, or WhatsApp support available in the chatbot interface." },
    { question: /are courses updated regularly/i, answer: "Our courses are reviewed and updated regularly to ensure content stays current with industry standards." },
    { question: /can i share my certificate on social media/i, answer: "Yes, certificates come with shareable links optimized for LinkedIn and other platforms." },
    { question: /do you provide transcripts or detailed reports/i, answer: "You can download your learning transcripts and progress reports from your dashboard." },
    { question: /how secure is my data/i, answer: "We take data security seriously and comply with industry best practices to protect your information." },
    { question: /can i learn multiple courses simultaneously/i, answer: "Yes, you can enroll and learn multiple courses at the same time." },
    { question: /what if i have questions during the course/i, answer: "Use the discussion forums, message instructors, or ask questions via the chatbot for assistance." },
    { question: /do you offer career counseling/i, answer: "We provide career guidance and mentorship programs. Contact support for more information." },
    { question: /how do i cancel my enrollment/i, answer: "You can cancel enrollment from your dashboard before completing 20% of the course. Contact support for help." },
    { question: /can i access courses after completion/i, answer: "Yes, you have lifetime access to courses you have completed." },
    { question: /do you have a mobile app/i, answer: "Our mobile app is available on iOS and Android for convenient learning on the go." },
    { question: /how do i provide feedback/i, answer: "You can rate and review courses after completion via your dashboard." },
    { question: /can i download videos for offline viewing/i, answer: "Video downloads are available for select courses. Check course details for availability." },
    { question: /what are the system requirements/i, answer: "A modern web browser and stable internet connection are required for the best experience." },
    { question: /do you offer live chat support/i, answer: "Yes, live chat support is available during business hours via the chatbot interface." },
    { question: /how do i reset my learning progress/i, answer: "You can reset your progress from course settings if you want to start over." },
    { question: /can i get help with assignments/i, answer: "Instructors and mentors are available to assist with assignments through course forums." },
    { question: /do you offer certificates for free courses/i, answer: "Certificates are provided for free courses that include assessments and completion criteria." },
    { question: /how do i report bugs or issues/i, answer: "Use the 'Report Issue' button in your profile or contact support via email or WhatsApp." },
    { question: /can i customize my learning dashboard/i, answer: "Yes, you can rearrange widgets and personalize your dashboard layout." },
    { question: /what languages are courses available in/i, answer: "Currently, courses are offered in English with subtitles in multiple languages." },
    { question: /do you offer mentorship programs/i, answer: "We offer mentorship programs for select courses. Contact support to learn more." },
    { question: /how do i access course materials/i, answer: "Course materials are accessible from the course dashboard under each lesson." },
    { question: /can i share courses with friends/i, answer: "You can share course links and referral codes with friends for discounts." },
    { question: /what is the refund process/i, answer: "To request a refund, contact support within 7 days of purchase with your order details." },
    { question: /how do i change my email address/i, answer: "Update your email address from your Profile settings page." },
    { question: /do you offer corporate training/i, answer: "Yes, we provide corporate training solutions. Contact sales for details." },
    { question: /can i get a transcript of my courses/i, answer: "Transcripts are available for download from your dashboard." },
    { question: /how do i delete my account/i, answer: "Account deletion is permanent. You can request deletion from Profile > Settings." },
    { question: /do you have a referral program/i, answer: "Yes, refer friends and earn rewards through our referral program." },
    { question: /can i access courses offline/i, answer: "Offline access is available for select courses via our mobile app." },
    { question: /how do i update my payment information/i, answer: "Update payment details from your account billing settings." },
    { question: /what is the course refund policy/i, answer: "Refunds are available within 7 days if less than 20% of the course is completed." },
    { question: /do you offer discounts for students/i, answer: "Student discounts are available on select courses. Contact support for eligibility." },
    { question: /how do i contact instructors/i, answer: "Message instructors directly through the course dashboard or forums." },
    { question: /can i get help with career advice/i, answer: "Career counseling is available through our mentorship programs." },
    { question: /what is the learning path/i, answer: "Learning paths guide you through a sequence of courses tailored to your goals." },
    { question: /how do i access live sessions/i, answer: "Live sessions are accessible via the course dashboard on scheduled dates." },
    { question: /can i retake quizzes/i, answer: "Quizzes can be retaken as per course policies to improve your score." },
    { question: /do you provide transcripts/i, answer: "Yes, transcripts are downloadable from your profile." },
    { question: /how do i change my password/i, answer: "Change your password from Profile > Security settings." },
    { question: /can i get a certificate for partial completion/i, answer: "Certificates are awarded only upon full course completion." },
    { question: /do you offer practice projects/i, answer: "Many courses include hands-on projects to apply your learning." },
    { question: /how do i access course forums/i, answer: "Forums are available within each course dashboard for discussions." },
    { question: /can i get notifications for course updates/i, answer: "Enable notifications in your account settings to stay updated." },
    { question: /do you support multiple devices/i, answer: "Yes, your progress syncs across all devices logged into your account." },
    { question: /how do i provide course feedback/i, answer: "Submit feedback and ratings after course completion via your dashboard." },
    { question: /can i pause my subscription/i, answer: "Subscription pause options are available. Contact support for assistance." },
    { question: /what is the refund timeframe/i, answer: "Refund requests must be made within 7 days of purchase." },
    { question: /do you offer trial periods/i, answer: "Some courses offer free trial lessons. Check course details for availability." },
    { question: /how do i access course certificates/i, answer: "Certificates are available for download from your dashboard after completion." },
    { question: /can i share my progress with others/i, answer: "You can share your progress reports and certificates with peers or employers." },
    { question: /do you have a help center/i, answer: "Visit our Help Center for FAQs, guides, and support resources." },
    { question: /how do i update my profile picture/i, answer: "Update your profile picture from your Profile settings page." },
    { question: /can i get reminders for assignments/i, answer: "Enable assignment reminders in your notification settings." },
    { question: /do you offer language support/i, answer: "Courses are primarily in English with subtitles in multiple languages." },
    { question: /how do i access course transcripts/i, answer: "Transcripts are downloadable from your course dashboard." },
    { question: /can i get help with course selection/i, answer: "Use our course recommendation tool or contact support for guidance." },
    { question: /do you offer certificates for free courses/i, answer: "Certificates are provided for free courses that meet completion criteria." },
    { question: /how do i report inappropriate content/i, answer: "Report issues via the 'Report' button in course forums or contact support." },
    { question: /can i get help with technical setup/i, answer: "Technical support is available via chatbot, email, and WhatsApp." },
    { question: /do you offer group enrollments/i, answer: "Group enrollments are supported with special pricing. Contact sales." },
    { question: /how do i access course materials offline/i, answer: "Offline access is available through our mobile app for select courses." },
    { question: /can i get help with assignments/i, answer: "Instructors and mentors assist with assignments via forums and messaging." },
    { question: /do you offer mentorship/i, answer: "Mentorship programs are available for select courses. Contact support." },
    { question: /how do i cancel my subscription/i, answer: "Cancel subscriptions from your account billing settings or contact support." },
    { question: /can i get a refund if unsatisfied/i, answer: "Refunds are available within 7 days if less than 20% of the course is completed." },
    { question: /do you offer career services/i, answer: "Career services including counseling and job placement assistance are available." },
    { question: /how do i access live webinars/i, answer: "Live webinars are accessible via course dashboards on scheduled dates." },
    { question: /can i share course content/i, answer: "Sharing course content is restricted by copyright. Share course links instead." },
    { question: /do you offer certificates for professional development/i, answer: "Yes, certificates can be used for professional development and continuing education." },
    { question: /how do i update billing information/i, answer: "Update billing info from your account settings under Billing." },
    { question: /can i get help with course navigation/i, answer: "Use the chatbot or support channels for help navigating courses." },
    { question: /do you offer discounts/i, answer: "Discounts are available during promotions and for students. Contact support." },
    { question: /how do i access course transcripts/i, answer: "Transcripts are downloadable from your profile and course dashboards." },
    { question: /can i get help with account issues/i, answer: "Account support is available via chatbot, email, and WhatsApp." },
    { question: /do you offer certificates for workshops/i, answer: "Certificates are provided for workshops that meet completion requirements." },
    { question: /how do i change my notification preferences/i, answer: "Change notification settings from your account preferences." },
    { question: /can i get help with course prerequisites/i, answer: "Prerequisites are listed on course pages. Contact support for guidance." },
    { question: /do you offer personalized learning paths/i, answer: "Yes, personalized learning paths are available based on your goals." },
    { question: /how do i access course forums/i, answer: "Forums are accessible within each course dashboard for discussions." },
    { question: /can i get help with course technical requirements/i, answer: "Technical requirements are listed on course pages. Support is available if needed." },
    { question: /do you offer certificates for continuing education/i, answer: "Certificates can be used for continuing education credits where applicable." },
    { question: /how do i update my contact information/i, answer: "Update contact info from your Profile settings page." },
    { question: /can i get help with course deadlines/i, answer: "Deadlines are shown in course dashboards. Contact support for extensions." },
    { question: /do you offer certificates for online courses/i, answer: "Yes, digital certificates are provided for all completed online courses." },
    { question: /how do i access course videos/i, answer: "Videos are accessible within each lesson on the course dashboard." },
    { question: /can i get help with course feedback/i, answer: "Submit feedback via your dashboard or contact support for assistance." },
    { question: /do you offer certificates for professional training/i, answer: "Certificates are available for professional training courses." },
    { question: /how do i change my password/i, answer: "Change your password from Profile > Security settings." },
    { question: /can i get help with course schedules/i, answer: "Schedules are available on course pages. Contact support for changes." },
    { question: /do you offer certificates for skill development/i, answer: "Certificates are provided for skill development courses." },
    { question: /how do i access course quizzes/i, answer: "Quizzes are accessible within each lesson on the course dashboard." },
    { question: /can i get help with course enrollment/i, answer: "Use the chatbot or contact support for enrollment assistance." },
    { question: /do you offer certificates for certification courses/i, answer: "Certificates are provided for certification courses upon completion." },
    { question: /how do i update my profile/i, answer: "Update your profile from your Profile settings page." },
    { question: /can i get help with course content/i, answer: "Contact instructors or support for help with course content." },
    { question: /do you offer certificates for advanced courses/i, answer: "Certificates are available for advanced courses upon completion." },
    { question: /how do i access course assignments/i, answer: "Assignments are accessible within each lesson on the course dashboard." },
    { question: /can i get help with course payments/i, answer: "Contact support for assistance with payments and billing." },
    { question: /do you offer certificates for beginner courses/i, answer: "Certificates are provided for beginner courses upon completion." },
    { question: /how do i update my learning preferences/i, answer: "Update learning preferences from your Profile settings." },
    { question: /can i get help with course navigation/i, answer: "Use the chatbot or support channels for help navigating courses." },
    { question: /do you offer certificates for intermediate courses/i, answer: "Certificates are available for intermediate courses upon completion." },
    { question: /how do i access course resources/i, answer: "Resources are accessible within each lesson on the course dashboard." },
    { question: /can i get help with course technical issues/i, answer: "Technical support is available via chatbot, email, and WhatsApp." },
    { question: /do you offer certificates for expert courses/i, answer: "Certificates are provided for expert-level courses upon completion." },
    { question: /how do i update my account settings/i, answer: "Update account settings from your Profile page." },
    { question: /can i get help with course progress/i, answer: "Use the dashboard or contact support for progress assistance." },
    { question: /do you offer certificates for professional development/i, answer: "Certificates are available for professional development courses." },
    { question: /how do i access course feedback/i, answer: "Feedback can be submitted via your dashboard after course completion." },
    { question: /can i get help with course certificates/i, answer: "Contact support for help with certificates and verification." },
    { question: /do you offer certificates for continuing education/i, answer: "Certificates can be used for continuing education credits where applicable." },
    { question: /how do i update my billing information/i, answer: "Update billing info from your account settings under Billing." },
    { question: /can i get help with course refunds/i, answer: "Refunds are available within 7 days if less than 20% of the course is completed." },
    { question: /do you offer certificates for online learning/i, answer: "Yes, digital certificates are provided for all completed online courses." },
    { question: /how do i access course notifications/i, answer: "Notifications can be managed from your account settings." },
    { question: /can i get help with course cancellations/i, answer: "Contact support to cancel enrollments or subscriptions." },
    { question: /do you offer certificates for skill enhancement/i, answer: "Certificates are available for skill enhancement courses." },
    { question: /how do i update my contact preferences/i, answer: "Update contact preferences from your Profile settings." },
    { question: /can i get help with course extensions/i, answer: "Contact support to request extensions on course deadlines." },
    { question: /do you offer certificates for professional courses/i, answer: "Certificates are provided for professional courses upon completion." },
    { question: /how do i access course transcripts/i, answer: "Transcripts are downloadable from your profile and course dashboards." },
    { question: /can i get help with course upgrades/i, answer: "Contact support for information on course upgrades and additional content." },
    { question: /do you offer certificates for certification programs/i, answer: "Certificates are provided for certification programs upon completion." },
    { question: /how do i update my learning goals/i, answer: "Update learning goals from your Profile settings page." },
    { question: /can i get help with course renewals/i, answer: "Contact support for course renewal options and pricing." },
    { question: /do you offer certificates for advanced training/i, answer: "Certificates are available for advanced training courses." },
    { question: /how do i access course schedules/i, answer: "Schedules are available on course pages and dashboards." },
    { question: /can i get help with course technical support/i, answer: "Technical support is available via chatbot, email, and WhatsApp." },
    { question: /do you offer certificates for professional certifications/i, answer: "Certificates are provided for professional certifications upon completion." },
  ];

  // Function to check if user input matches at least 30% of a question string
  const isPartialMatch = (input: string, question: string) => {
    const inputLower = input.toLowerCase();
    const questionLower = question.toLowerCase();
    if (inputLower.length < Math.ceil(questionLower.length * 0.3)) {
      return false;
    }
    return questionLower.includes(inputLower);
  };

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase().trim();

    // First try exact regex match
    const matchedQuestion = lmsKnowledgeBase.find(item =>
      item.question.test(message)
    );

    if (matchedQuestion) {
      return matchedQuestion.answer;
    }

    // If no exact match, try partial match with at least 30% of question text
    const partialMatch = lmsKnowledgeBase.find(item => {
      // Extract question string from regex pattern for partial matching
      const questionStr = item.question.source.replace(/\\b|\\s|\^|\$|\|/g, " ").trim();
      return isPartialMatch(message, questionStr);
    });

    if (partialMatch) {
      return partialMatch.answer;
    }

    // Fallback responses
    const fallbacks = [
      "I can help with course info, enrollment, schedules, and more. Try asking about these topics.",
      "Could you rephrase your question? I'm here to help with LMS-related queries.",
      "I don't have that information. For detailed help, please contact our support team."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: "user" }]);
    setInputValue("");

    // Get and send bot response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: mode === "chat"
          ? getBotResponse(inputValue)
          : "You can contact us on WhatsApp at +91 12345 67890 for course inquiries and support.",
        sender: "bot"
      }]);
    }, 1000);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleModeChange = (newMode: "chat" | "whatsapp") => {
    setMode(newMode);
    setMessages([]); // Clear messages when changing modes
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chatbot header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold">
                {mode === "chat" ? "TechSpira Assistant" : "WhatsApp Support"}
              </h3>
              <button
                onClick={toggleChatbot}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mode selector */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => handleModeChange("chat")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "chat" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                Chat
              </button>
              <button
                onClick={() => handleModeChange("whatsapp")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "whatsapp" ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                WhatsApp
              </button>
            </div>

            {/* Chat content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mode === "chat" ? (
                messages.length > 0 ? (
                  messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"}`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 text-center p-4">
                    <p>Hi there! How can I help you with TechSpira today?</p>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">WhatsApp Support</h4>
                  <p className="text-gray-600 mb-4">
                    Contact us directly on WhatsApp for quick assistance with courses, enrollment, and support.
                  </p>
                  <a
                    href="https://wa.me/919108273496"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Open WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* Input area (only for chat mode) */}
            {mode === "chat" && (
              <div className="border-t border-gray-200 p-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot toggle button */}
      <motion.button
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`rounded-full p-4 shadow-xl ${mode === "chat" ? "bg-blue-600" : "bg-green-600"} text-white`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : mode === "chat" ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
