import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Shariful_islam_udoy-dark-image.jpg"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 px-6 md:px-10 gap-12 max-w-7xl mx-auto">

      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3 flex justify-center"
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
        className="text-left w-full md:w-2/3"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-black">
          Website & Graphic <br /> Designer
        </h1>
        <p className="mt-6 text-lg text-gray-600 ">
          I am a Professional Website & Graphic Designer. This website contains design works that I have produced over the past few years. Find various types of design projects such as logo designs, brochure designs, product packaging designs, website designs, and many more.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-2 bg-orange-500 text-white font-semibold rounded-full text-lg shadow-md hover:bg-orange-600 transition-all"
        >
          Let’s Talk
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
