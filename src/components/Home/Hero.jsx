import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        // fallback to default values already set in state
      })
      .finally(() => setLoading(false));
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Skeleton Loader with brand-aligned light green (#DEF29B tint)
  const Skeleton = () => (
    <div className="animate-pulse flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-10 lg:gap-12">
      {/* Image skeleton */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex justify-center">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
          <div className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] bg-[#d4e88a] w-full aspect-[3/4] md:aspect-[4/5]"></div>
        </div>
      </div>

      {/* Text skeleton */}
      <div className="text-center md:text-left w-full md:w-3/5 lg:w-2/3">
        <div className="h-10 sm:h-12 md:h-14 bg-[#d4e88a] rounded-lg w-3/4 mx-auto md:mx-0 mb-4"></div>
        <div className="space-y-3 mt-6">
          <div className="h-4 bg-[#d4e88a] rounded w-full"></div>
          <div className="h-4 bg-[#d4e88a] rounded w-5/6 mx-auto md:mx-0"></div>
          <div className="h-4 bg-[#d4e88a] rounded w-4/5 mx-auto md:mx-0"></div>
          <div className="h-4 bg-[#d4e88a] rounded w-2/3 mx-auto md:mx-0"></div>
        </div>
        <div className="mt-8 h-12 bg-[#d4e88a] rounded-full w-40 mx-auto md:mx-0"></div>
      </div>
    </div>
  );

  return (
    <div
      id="home"
      className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col md:flex-row items-center justify-between w-full mt-8 md:mt-12 lg:mt-16 gap-8 md:gap-10 lg:gap-12 mx-auto max-w-7xl"
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/5 lg:w-1/3 flex justify-center"
          >
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full">
              <img
                src={heroData.imageUrl || defaultImage}
                alt="Profile"
                className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] object-cover w-full h-auto shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right Side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center md:text-left w-full md:w-3/5 lg:w-2/3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#022F2B] leading-tight">
              {heroData.title}
            </h1>

            <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto md:mx-0">
              {heroData.description}
            </p>

            <motion.button
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 sm:mt-7 md:mt-15 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-[#FF7536] text-white font-semibold rounded-full text-base sm:text-lg shadow-md hover:bg-[#012F2B] hover:text-[#FF7536] transition-all w-full sm:w-auto"
            >
              Let's Talk
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Hero;