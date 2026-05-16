import React from "react";
import { motion } from "framer-motion";
import { Shield, Mail, CheckCircle, FileText, Info, Lock } from "lucide-react";

// ---------- Animation Variants ----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const PrivacyPolicy = () => {
  return (
    <div className="relative overflow-hidden px-4 py-8 md:px-6 w-full mt-12 md:mt-16">
      {/* Decorative floating background elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20  rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32  rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Main Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 rounded-[3rem] bg-[#F2F6FA] p-6 md:p-12 lg:p-16 border border-white/40 "
      >
        {/* Header with Shield icon */}
        <motion.div className="flex items-center gap-3 mb-6" variants={itemVariants}>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-[#FF7537]" />
          </motion.div>
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]">
            Privacy Policy
          </motion.h2>
        </motion.div>

        {/* Content with icons */}
        <motion.div
          className="mt-8 md:mt-12 space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed"
          variants={containerVariants}
        >
          {/* Paragraph 1 */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <Info className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Graphicverse LLC values your privacy and is committed to protecting your personal information.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <FileText className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            We may collect basic information such as your name, email address, phone number, and project details when you contact us or use our services.
          </motion.p>

          {/* List of uses */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
              <p>Your information is used only to:</p>
            </div>
            <motion.ul
              className="ml-10 mt-2 space-y-2"
              variants={containerVariants}
            >
              {["Communicate about projects", "Provide design services", "Improve our website and customer experience"].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-[#FF7537] flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Paragraph 3 */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <Lock className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            We do not sell or share your personal information with third parties except when necessary for trusted services such as hosting, payments, or analytics.
          </motion.p>

          {/* Paragraph 4 */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            By using our website, you agree to this Privacy Policy.
          </motion.p>

          {/* Contact line */}
          <motion.p variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <Mail className="w-5 h-5 text-[#FF7537] flex-shrink-0" />
            For questions, contact:{" "}
            <a
              href="mailto:hello@graphic-verse.com"
              className="text-[#FF7537] font-semibold hover:text-[#022F2B] transition-colors underline decoration-dotted hover:decoration-solid"
            >
              hello@graphic-verse.com
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;