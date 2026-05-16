import React from "react";
import { motion } from "framer-motion";
import { Scale, FileText, Info, CheckCircle, Mail, Clock, FolderOpen, AlertCircle } from "lucide-react";

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

const TermsAndConditions = () => {
  return (
    <div className="relative overflow-hidden px-4 py-8 md:px-6 w-full mt-12 md:mt-16">
      {/* Decorative floating background elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Main Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 rounded-[3rem] bg-[#F2F6FA] p-6 md:p-12 lg:p-16 border border-white/40"
      >
        {/* Header with Scale icon */}
        <motion.div className="flex items-center gap-3 mb-6" variants={itemVariants}>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Scale className="w-8 h-8 md:w-10 md:h-10 text-[#FF7537]" />
          </motion.div>
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]">
            Terms of Service
          </motion.h2>
        </motion.div>

        {/* Content with icons */}
        <motion.div
          className="mt-8 md:mt-12 space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed"
          variants={containerVariants}
        >
          {/* Agreement statement */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <Info className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            By using Graphicverse LLC services, you agree to the following terms.
          </motion.p>

          {/* Services provided */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <FileText className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Graphicverse LLC provides graphic design services including social media ads, web banners,
            flyers, brochures, posters, and branding materials.
          </motion.p>

          {/* Client responsibilities */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Clients are responsible for providing accurate content, branding assets, and project requirements.
          </motion.p>

          {/* Delivery & payment */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Final design files are delivered after full payment unless otherwise agreed.
          </motion.p>

          {/* Refund policy */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Due to the digital nature of design services, refunds are generally not available once work has started.
          </motion.p>

          {/* Portfolio showcase */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <FolderOpen className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            Graphicverse LLC may showcase completed work in portfolios and promotional materials unless otherwise
            requested by the client.
          </motion.p>

          {/* Right to update */}
          <motion.p variants={itemVariants} className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-1 text-[#FF7537] flex-shrink-0" />
            We reserve the right to update these terms at any time.
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

export default TermsAndConditions;