import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Shariful_islam_udoy-dark-image.jpg"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 gap-12 gap-30 w-11/12 mx-auto">

      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[342px] h-[447px] md:w-1/4 flex justify-center"
      >
        <img
          src={image} // replace with your image path
          alt="Profile"
          className="rounded-[2.5rem] object-cover bg-[#d3f6c6] p-4"
        />
      </motion.div>

      {/* Right Side - Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-left w-full md:w-3/4"
      >
        <h1 className="text-8xl w-11/12 font-bold text-[#012F2B]">
          Website & Graphic Designer
        </h1>
        <p className="mt-6 text-2xl text-gray-600 ">
          I am a Professional Website & Graphic Designer. This website contains design works that I have produced over the past few years. Find various types of design projects such as logo designs, brochure designs, product packaging designs, website designs, and many more.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-12 py-4 bg-[#FF7536] text-white font-semibold rounded-full text-2xl shadow-md hover:bg-[#00332C] transition-all hover:text-[#FF7536]"
        >
          Let’s Talk
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
