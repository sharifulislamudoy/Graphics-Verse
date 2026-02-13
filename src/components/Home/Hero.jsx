import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/hero-image.png"

const Hero = () => {
  return (
<<<<<<< HEAD
    <div className="px-4 py-4 md:px-6 flex items-center justify-between w-full mt-15 gap-">
=======
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 gap-12 gap-30 w-11/12 mx-auto">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1

      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
<<<<<<< HEAD
        className="w-full md:w-1/3"
=======
        className="w-[342px] h-[447px] md:w-1/4 flex justify-center"
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
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
        className="text-left w-full md:w-3/4"
      >
<<<<<<< HEAD
        <h1 className="text-5xl  md:text-[90px] font-semibold text-[#022F2B]">
          Website & Graphic Designer
        </h1>
        <p className="mt-6 lg:text-xl text-md text-gray-500 ">
=======
        <h1 className="text-8xl w-11/12 font-bold text-[#012F2B]">
          Website & Graphic Designer
        </h1>
        <p className="mt-6 text-2xl text-gray-600 ">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
          I am a Professional Website & Graphic Designer. This website contains design works that I have produced over the past few years. Find various types of design projects such as logo designs, brochure designs, product packaging designs, website designs, and many more.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
          className="mt-8 px-10 py-3 bg-[#FF7536] text-white font-semibold rounded-full text-lg shadow-md hover:bg-[#012F2B] hover:text-[#FF7536] transition-all"
=======
          className="mt-8 px-12 py-4 bg-[#FF7536] text-white font-semibold rounded-full text-2xl shadow-md hover:bg-[#00332C] transition-all hover:text-[#FF7536]"
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
        >
          Let’s Talk
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
