import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import defaultImage from "../../assets/hero-image.png";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Graphic Designer",
    description:
      "I am a Professional Graphic Designer. This Graphic contains design works that I have produced over the past few years. Find various types of design projects such as logo designs, brochure designs, product packaging designs, website designs, and many more.",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setHeroData(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load hero data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Staggered text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Floating animation for image
  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  // Skeleton Loader with blue theme
  const Skeleton = () => (
    <div className="animate-pulse flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-10 lg:gap-12">
      <div className="w-full md:w-2/5 lg:w-1/3 flex justify-center">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
          <div className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] bg-gradient-to-br from-blue-200/50 to-blue-300/30 w-full aspect-[3/4] md:aspect-[4/5] shadow-lg"></div>
        </div>
      </div>
      <div className="text-center md:text-left w-full md:w-3/5 lg:w-2/3">
        <div className="h-10 sm:h-12 md:h-14 bg-gradient-to-r from-blue-300/60 to-blue-400/40 rounded-lg w-3/4 mx-auto md:mx-0 mb-4"></div>
        <div className="space-y-3 mt-6">
          <div className="h-4 bg-blue-200/50 rounded w-full"></div>
          <div className="h-4 bg-blue-200/50 rounded w-5/6 mx-auto md:mx-0"></div>
          <div className="h-4 bg-blue-200/50 rounded w-4/5 mx-auto md:mx-0"></div>
          <div className="h-4 bg-blue-200/50 rounded w-2/3 mx-auto md:mx-0"></div>
        </div>
        <div className="mt-8 h-12 bg-blue-400/60 rounded-full w-40 mx-auto md:mx-0"></div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow Effects - matching navbar style */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="px-4 md:px-8 py-8 sm:py-12 lg:py-16 flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-10 lg:gap-12 mx-auto max-w-7xl relative z-10">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {/* Left Side - Image with floating and hover effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="w-full md:w-2/5 lg:w-1/3 flex justify-center perspective-500"
            >
              <motion.div
                animate={floatingAnimation}
                className="relative group"
              >
                {/* Glow ring behind image */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <img
                  src={heroData.imageUrl || defaultImage}
                  alt="Profile"
                  className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] object-cover w-full h-auto shadow-2xl shadow-blue-500/20 border border-blue-500/20 relative z-10"
                />
              </motion.div>
            </motion.div>

            {/* Right Side - Text with staggered animations */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center md:text-left w-full md:w-3/5 lg:w-2/3"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 bg-clip-text text-transparent leading-tight"
              >
                {heroData.title}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              >
                {heroData.description}
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 md:mt-10">
                <motion.button
                  onClick={handleScrollToContact}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 30px rgba(37,99,235,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Talk
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>

                  {/* Shine Animation - same as navbar button */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></span>
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;