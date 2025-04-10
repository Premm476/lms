// pages/chatbot.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotPage() {
  const [mode, setMode] = useState<"chat" | "whatsapp">("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([]);
  const [inputValue, setInputValue] = useState("");

  const lmsKnowledgeBase = [
    // Course enrollment questions (with partial matching)
    {
      question: /course.*available|what.*learn|available.*courses/i,
      answer: "We offer courses in Web Development, Data Science, AI/ML, and more. Visit our Courses page for details."
    },
    {
      question: /enroll|register|join|sign.*up/i,
      answer: "Go to the Courses page and click 'Enroll Now' on any course."
    },
    {
      question: /retake|restart|start.*again/i,
      answer: "Yes, just click 'Retake' on the completed course card."
    },
    {
      question: /self.*paced|pace.*own/i,
      answer: "Most are! Some may include live sessions too."
    },
    {
      question: /pause.*course|continue.*later|stop.*continue/i,
      answer: "Yes! Your progress is saved automatically."
    },
    {
      question: /prereq|required.*knowledge|before.*start/i,
      answer: "Some advanced courses may require basic knowledge of the subject."
    },
    {
      question: /duration|how.*long|length|weeks.*complete/i,
      answer: "It varies, but most range from 2-8 weeks."
    },
    {
      question: /course.*limit|how.*many|multiple.*courses/i,
      answer: "No limit! You can enroll in as many as you like."
    },
    {
      question: /search.*course|find.*course|filter.*courses/i,
      answer: "Use the search bar or apply filters on the Courses page."
    },
    {
      question: /preview|sample|try.*before|free.*look/i,
      answer: "Yes! Each course includes a free preview section."
    },
    {
      question: /quiz|assignment|test|exercise/i,
      answer: "Yes, all courses include interactive tasks."
    },
    {
      question: /discussion|forum|ask.*question|community/i,
      answer: "Most courses include a forum for discussions."
    },
    {
      question: /rate|review|feedback.*course/i,
      answer: "Yes! Leave a rating and review after completion."
    },
    {
      question: /resume.*course|continue.*learning|pick.*up/i,
      answer: "Click 'Continue Learning' from your dashboard."
    },
    {
      question: /mobile|phone|tablet|device.*support/i,
      answer: "Absolutely! Our platform is optimized for all devices."
    },
    {
      question: /change.*course|switch.*course|different.*course/i,
      answer: "Yes, you can switch before completing 20% of the course."
    },
    {
      question: /lesson.*format|text|video|pdf|exercise/i,
      answer: "We offer both, along with PDFs and practice exercises."
    },
    {
      question: /lesson.*notes|take.*notes|note.*taking/i,
      answer: "Go to the lesson and click the 'Notes' tab."
    },
    {
      question: /difficulty|level|beginner|intermediate|advanced/i,
      answer: "It's designed for [Beginner/Intermediate/Advanced] learners."
    },
    {
      question: /project|hands.*on|practice|build.*something/i,
      answer: "Yes! Most courses include capstone projects."
    },

    // Student progress questions (with partial matching)
    {
      question: /enrolled.*courses|my.*courses|current.*learning/i,
      answer: "You're currently enrolled in [Course List]."
    },
    {
      question: /how.*completed|progress|percentage.*done/i,
      answer: "You've completed 45% of [Course Name]."
    },
    {
      question: /overall.*progress|learning.*status|how.*doing/i,
      answer: "Your dashboard shows progress for each course."
    },
    {
      question: /quiz.*score|test.*result|grade|performance/i,
      answer: "Yes, under the 'Performance' tab in your course."
    },
    {
      question: /learning.*history|past.*activity|history/i,
      answer: "Go to your Profile > Learning History."
    },
    {
      question: /reminder|notification|alert|email.*update/i,
      answer: "Yes, you'll get email and in-app notifications."
    },
    {
      question: /mark.*complete|finish.*lesson|done.*lesson/i,
      answer: "Click the 'Mark Complete' button at the end of the lesson."
    },
    {
      question: /downloaded.*lessons|offline.*content|save.*lessons/i,
      answer: "In the 'My Library' tab on your dashboard."
    },
    {
      question: /completed.*courses|finished.*courses|done.*courses/i,
      answer: "Yes, check the 'Completed' section in your dashboard."
    },
    {
      question: /leaderboard|ranking|compare.*others/i,
      answer: "It ranks students based on course performance. Check the 'Leaderboard' tab."
    },
    {
      question: /xp|experience.*points|points.*earn/i,
      answer: "By completing lessons, quizzes, and engaging in discussions."
    },
    {
      question: /streak|daily.*login|consecutive.*days/i,
      answer: "Daily login streaks reward consistent learners."
    },
    {
      question: /reset.*progress|start.*over|clear.*progress/i,
      answer: "Go to course settings and select 'Reset Progress'."
    },
    {
      question: /customize.*dashboard|rearrange.*widgets|personalize/i,
      answer: "Yes, drag and drop widgets to rearrange them."
    },
    {
      question: /progress.*bar|completion.*meter|how.*far/i,
      answer: "It shows how much of the course you've completed."
    },
    {
      question: /assignment.*deadline|due.*date|when.*due/i,
      answer: "View the calendar or course overview section."
    },
    {
      question: /export.*data|learning.*summary|download.*progress/i,
      answer: "Yes, go to Profile > Export Learning Summary."
    },
    {
      question: /average.*score|grade.*average|overall.*grade/i,
      answer: "Your current average score is 87%."
    },
    {
      question: /badge|achievement|reward|milestone/i,
      answer: "By completing milestones in your learning journey."
    },
    {
      question: /notebook|notes|jot.*down|write.*notes/i,
      answer: "It lets you jot down notes while studying."
    },
    {
      question: /sync.*progress|multiple.*devices|continue.*anywhere/i,
      answer: "Yes! Everything is synced to your account in real-time."
    },

    // Certificate questions (with partial matching)
    {
      question: /cert.*complete|get cert|complete.*cert/i,
      answer: "Yes! Complete all lessons and quizzes to receive your certificate."
    },
    {
      question: /down.*cert|cert.*down/i,
      answer: "Go to your Dashboard > Certificates tab to view and download it."
    },
    {
      question: /share.*cert|linkedin.*cert|cert.*linkedin/i,
      answer: "Yes! You'll get a LinkedIn-friendly link after completion."
    },
    {
      question: /hard.*cert|cert.*hard|physical.*cert/i,
      answer: "Currently, we provide only digital certificates."
    },
    {
      question: /verify.*cert|cert.*verify|valid.*cert/i,
      answer: "Yes, each certificate has a unique verification code."
    },
    {
      question: /name.*cert|cert.*name|wrong.*name/i,
      answer: "Go to Profile > Edit Name and re-download the certificate."
    },
    {
      question: /fee.*cert|cert.*cost|price.*cert/i,
      answer: "No! It's free if you complete the course. Some premium courses may charge extra."
    },
    {
      question: /free.*cert|cert.*free/i,
      answer: "Yes, if the free course includes assessment."
    },
    {
      question: /when.*cert|cert.*when|time.*cert/i,
      answer: "Instantly, once you complete all modules and pass the final quiz."
    },
    {
      question: /social.*cert|cert.*social|share.*media/i,
      answer: "Absolutely! Use the 'Share' button under your certificate."
    },

    // Instructor questions (with partial matching)
    {
      question: /upload.*course|add.*content|create.*lesson/i,
      answer: "Go to Instructor Panel > Add Course, and follow the steps."
    },
    {
      question: /edit.*course|update.*content|modify.*lesson/i,
      answer: "Navigate to My Courses > Edit, make your changes, and save."
    },
    {
      question: /delete.*lesson|remove.*content|erase.*module/i,
      answer: "Yes, just go to the lesson list and click the trash icon next to it."
    },
    {
      question: /add.*quiz|create.*test|make.*assessment/i,
      answer: "While editing your course, click 'Add Quiz' under the appropriate module."
    },
    {
      question: /track.*student|monitor.*progress|view.*stats/i,
      answer: "Use the Analytics section in your Instructor Dashboard."
    },
    {
      question: /message.*students|announce.*class|notify.*learners/i,
      answer: "Yes! You can send announcements through your course dashboard."
    },
    {
      question: /assign.*live|schedule.*class|host.*session/i,
      answer: "Yes. Go to 'Live Sessions' and schedule one with a Zoom/Google Meet link."
    },
    {
      question: /respond.*student|answer.*question|reply.*query/i,
      answer: "Check the 'Discussions' tab or your Instructor Inbox."
    },
    {
      question: /offer.*discount|create.*coupon|set.*price/i,
      answer: "Yes, create a coupon code in the Pricing section."
    },
    {
      question: /see.*reviews|view.*feedback|check.*ratings/i,
      answer: "Go to My Courses > Reviews to manage and respond."
    },

    // Platform support questions (with partial matching)
    {
      question: /forgot.*password|reset.*login|recover.*account/i,
      answer: "Click 'Forgot Password' on the login page to reset via email."
    },
    {
      question: /sign.*in.*google|login.*github|social.*auth/i,
      answer: "Yes! Use the social login buttons on the login page."
    },
    {
      question: /course.*load|page.*stuck|content.*show/i,
      answer: "Try refreshing the page or clearing your browser cache."
    },
    {
      question: /report.*bug|submit.*issue|found.*problem/i,
      answer: "Use the 'Report Issue' button in your profile or chat support."
    },
    {
      question: /change.*email|update.*address|modify.*contact/i,
      answer: "Yes, go to Profile > Edit > Update Email."
    },
    {
      question: /enable.*dark|switch.*theme|night.*mode/i,
      answer: "Use the theme toggle at the bottom of the sidebar."
    },
    {
      question: /contact.*support|help.*needed|talk.*staff/i,
      answer: "Use the chatbot, or email support@example.com for help."
    },
    {
      question: /delete.*account|remove.*profile|close.*account/i,
      answer: "Yes, go to Profile > Settings > Delete Account. This action is irreversible."
    },
    {
      question: /courses.*saved|progress.*stored|data.*kept/i,
      answer: "Absolutely! Your progress is tied to your account."
    },
    {
      question: /browsers.*work|supported.*devices|compatible.*browser/i,
      answer: "Chrome, Firefox, Edge, Safari, and Brave are fully supported."
    },

    // Payment questions (with partial matching)
    {
      question: /pay.*course|buy.*content|purchase.*access/i,
      answer: "Use Razorpay with UPI, cards, or net banking at checkout."
    },
    {
      question: /get.*refund|return.*payment|cancel.*purchase/i,
      answer: "Yes, we offer a 7-day refund policy for most paid courses."
    },
    {
      question: /payment.*failed|transaction.*declined|card.*rejected/i,
      answer: "Try again or check your bank for details. Still stuck? Contact support."
    },
    {
      question: /subscription.*plan|monthly.*access|yearly.*membership/i,
      answer: "Yes! We offer monthly and yearly plans for unlimited access."
    },
    {
      question: /discount.*student|edu.*offer|academic.*price/i,
      answer: "Yes! Apply your student ID for 20% off selected plans."
    },

    // General questions (with partial matching)
    {
      question: /popular.*course|trending.*now|best.*selling/i,
      answer: "'Mastering React with TypeScript' is trending this week!"
    },
    {
      question: /connect.*learners|meet.*students|join.*community/i,
      answer: "Yes! Join course-based discussion forums or our Discord server."
    },
    {
      question: /mobile.*app|phone.*version|download.*app/i,
      answer: "Yes! Download our app from Google Play or the App Store."
    },
    {
      question: /refer.*friend|invite.*peer|share.*code/i,
      answer: "Go to the 'Referral' section in your dashboard and share your invite code."
    },
    {
      question: /become.*mentor|apply.*instructor|teach.*course/i,
      answer: "Yes! Apply through the Instructor portal to become a verified mentor."
    },

    // Study assistant questions (with partial matching)
    {
      question: /closure.*js|function.*scope|lexical.*env/i,
      answer: "A closure is when a function retains access to its outer scope even after the outer function has finished."
    },
    {
      question: /summarize|summary|key.*points/i,
      answer: "Sure! Here's a quick summary of the key points: [Summary]."
    },
    {
      question: /react.*hooks|use.*state|functional.*components/i,
      answer: "Hooks let you use state and lifecycle features in functional components."
    },
    {
      question: /==.*===|triple.*equals|strict.*comparison/i,
      answer: "== checks value equality; === checks value and type."
    },
    {
      question: /responsive.*layout|css.*grid|flex.*design/i,
      answer: "Use flexbox or grid and apply media queries."
    },
    {
      question: /quiz.*python|test.*knowledge|python.*questions/i,
      answer: "Here are 5 quick questions to test your knowledge: [Quiz]."
    },
    {
      question: /translate.*hindi|hindi.*version|content.*hindi/i,
      answer: "Sure! [Translated content]."
    },
    {
      question: /learn.*fast|quick.*study|speed.*learning/i,
      answer: "Practice daily, build projects, and revise concepts regularly."
    },
    {
      question: /projects.*beginner|first.*project|starter.*ideas/i,
      answer: "Try building a portfolio site, calculator, or to-do app."
    },
    {
      question: /recommend.*course|suggest.*class|what.*learn.*next/i,
      answer: "Based on your learning, you might like: [Course List]."
    },
    {
      question: /for.*loop.*python|python.*iteration|repeat.*code/i,
      answer: "for i in range(5): print(i)"
    },
    {
      question: /flashcards.*html|html.*cards|study.*cards/i,
      answer: "Sure! Here's a deck of flashcards: [HTML Flashcards]."
    },
    {
      question: /merge.*conflict|git.*problem|resolve.*changes/i,
      answer: "Edit the conflicted file, remove conflict markers, and commit the changes."
    },
    {
      question: /what.*api|api.*explain|application.*interface/i,
      answer: "An API lets two software applications talk to each other."
    },
    {
      question: /practice.*test.*java|java.*quiz|test.*java/i,
      answer: "Here's a 10-question test on Java basics."
    },
    {
      question: /sql.*joins|database.*join|relate.*tables/i,
      answer: "Sure! Here's a guide on INNER, LEFT, RIGHT, and FULL joins."
    },
    {
      question: /what.*dom|document.*object|html.*tree/i,
      answer: "DOM stands for Document Object Model — it's how the browser sees your HTML."
    },
    {
      question: /revision.*plan|study.*schedule|learning.*calendar/i,
      answer: "Yes! Here's a weekly schedule tailored to your course."
    },
    {
      question: /put.*patch|http.*methods|update.*resource/i,
      answer: "PUT replaces the entire resource; PATCH updates part of it."
    },
    {
      question: /recursion|function.*itself|base.*case/i,
      answer: "It's when a function calls itself until it reaches a base condition."
    },

    // Additional questions (40 more)
    {
      question: /course.*completion|finish.*course|complete.*all/i,
      answer: "You must complete all lessons and pass all quizzes to finish a course."
    },
    {
      question: /certificate.*expire|valid.*how.*long|cert.*duration/i,
      answer: "Certificates don't expire but may need updating for major course revisions."
    },
    {
      question: /group.*discount|team.*pricing|bulk.*enrollment/i,
      answer: "Yes! Contact sales for group discounts on 5+ enrollments."
    },
    {
      question: /course.*updates|content.*changed|new.*version/i,
      answer: "Updated content is marked with a 'New' badge and added to your progress."
    },
    {
      question: /instructor.*qualifications|teacher.*credentials/i,
      answer: "All instructors are industry experts with 5+ years experience."
    },
    {
      question: /course.*syllabus|what.*covered|topics.*list/i,
      answer: "The full syllabus is available on each course's overview page."
    },
    {
      question: /language.*options|translate.*content|available.*languages/i,
      answer: "Currently we support English, Hindi and Spanish subtitles."
    },
    {
      question: /download.*videos|save.*lessons|offline.*access/i,
      answer: "Yes, use the download button on video lessons for offline viewing."
    },
    {
      question: /course.*updates|notified.*changes|content.*updates/i,
      answer: "You'll get notifications when courses you're enrolled in are updated."
    },
    {
      question: /learning.*path|what.*next|recommended.*path/i,
      answer: "Check our Learning Paths section for guided course sequences."
    },
    {
      question: /instructor.*contact|message.*teacher|ask.*instructor/i,
      answer: "Use the 'Ask Instructor' button in your course dashboard."
    },
    {
      question: /course.*prerequisites|required.*before|what.*know.*first/i,
      answer: "Prerequisites are listed on each course description page."
    },
    {
      question: /refund.*policy|money.*back|cancel.*enrollment/i,
      answer: "7-day refunds available if you complete less than 20% of content."
    },
    {
      question: /payment.*methods|accepted.*cards|how.*pay/i,
      answer: "We accept all major credit cards, UPI, net banking and PayPal."
    },
    {
      question: /course.*updates|how.*often|content.*freshness/i,
      answer: "Courses are reviewed and updated at least twice per year."
    },
    {
      question: /technical.*requirements|computer.*needs|system.*specs/i,
      answer: "Most courses require a modern browser and internet connection."
    },
    {
      question: /course.*certificate|get.*cert|earn.*certification/i,
      answer: "Complete all course requirements to automatically earn your certificate."
    },
    {
      question: /learning.*resources|extra.*materials|additional.*content/i,
      answer: "Check the Resources tab in each course for bonus materials."
    },
    {
      question: /course.*difficulty|how.*hard|challenge.*level/i,
      answer: "Difficulty is rated from 1-5 stars on each course page."
    },
    {
      question: /time.*commitment|hours.*per.*week|study.*time/i,
      answer: "Most courses suggest 3-5 hours per week for optimal learning."
    },
    {
      question: /course.*recommendations|what.*take.*next|suggested.*path/i,
      answer: "Our recommendation engine suggests courses based on your progress."
    },
    {
      question: /instructor.*response|how.*long.*reply|answer.*time/i,
      answer: "Instructors typically respond within 24-48 hours."
    },
    {
      question: /course.*access|how.*long.*available|expire.*content/i,
      answer: "You get lifetime access to all courses you enroll in."
    },
    {
      question: /mobile.*app|download.*app|phone.*learning/i,
      answer: "Our mobile app is available on iOS and Android app stores."
    },
    {
      question: /course.*updates|how.*stay.*updated|new.*content/i,
      answer: "Follow your favorite courses to get update notifications."
    },
    {
      question: /learning.*analytics|track.*progress|stats.*performance/i,
      answer: "Your dashboard shows detailed learning analytics and insights."
    },
    {
      question: /course.*comparison|which.*better|compare.*options/i,
      answer: "Use our Course Comparison tool to evaluate different options."
    },
    {
      question: /instructor.*background|teacher.*experience|credentials/i,
      answer: "Instructor bios and credentials are listed on each course page."
    },
    {
      question: /course.*preview|free.*content|try.*before/i,
      answer: "All courses offer free preview lessons before enrollment."
    },
    {
      question: /learning.*community|join.*students|network.*peers/i,
      answer: "Join our Discord server to connect with other learners."
    },
    {
      question: /course.*version|latest.*update|when.*updated/i,
      answer: "The current version and last update date are shown on each course."
    },
    {
      question: /technical.*support|help.*center|contact.*help/i,
      answer: "Visit our Help Center or email support@example.com for assistance."
    },
    {
      question: /course.*completion|how.*long.*finish|time.*complete/i,
      answer: "Completion time varies based on your pace and course length."
    },
    {
      question: /learning.*goals|set.*objectives|track.*achievements/i,
      answer: "Set and track learning goals in your profile settings."
    },
    {
      question: /course.*quality|how.*good|content.*standards/i,
      answer: "All courses undergo rigorous quality review before publishing."
    },
    {
      question: /instructor.*rating|teacher.*reviews|feedback.*instructor/i,
      answer: "Instructor ratings are shown on their profile and course pages."
    },
    {
      question: /course.*search|find.*content|discover.*courses/i,
      answer: "Use keywords, filters and categories to find perfect courses."
    },
    {
      question: /learning.*reminders|study.*schedule|notifications/i,
      answer: "Set custom reminders in your account notification settings."
    },
    {
      question: /course.*value|worth.*it|return.*investment/i,
      answer: "Our students report significant career benefits from our courses."
    }
  ];

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Find matching question in knowledge base
    const matchedQuestion = lmsKnowledgeBase.find(item => 
      item.question.test(message)
    );

    if (matchedQuestion) {
      return matchedQuestion.answer;
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
                  <div className="space-y-2 text-left w-full">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Course information</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Enrollment assistance</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Technical support</span>
                    </div>
                  </div>
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