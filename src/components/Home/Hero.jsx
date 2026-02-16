import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/hero-image.png"

const Hero = () => {
  return (
    <div className="px-4 py-4 md:px-6 flex items-center justify-between w-full mt-15">

      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3"
      >
        <img
          src={image}
          alt="Profile"
          className="rounded-[3rem] object-cover "
        />
      </motion.div>

      {/* Right Side - Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-left w-full md:w-2/3"
      >
        <h1 className="text-5xl  md:text-[90px] font-semibold text-[#022F2B]">
          Website & Graphic Designer
        </h1>
        <p className="mt-6 lg:text-xl text-md text-gray-500 ">
          I am a Professional Website & Graphic Designer. This website contains design works that I have produced over the past few years. Find various types of design projects such as logo designs, brochure designs, product packaging designs, website designs, and many more.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-3 bg-[#FF7536] text-white font-semibold rounded-full text-lg shadow-md hover:bg-[#012F2B] hover:text-[#FF7536] transition-all"
        >
          Let’s Talk
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
