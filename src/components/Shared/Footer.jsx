import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Footer = () => {
  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'Testimonials'];

  return (
    <div className="px-4 py-8 md:px-6 w-full mt-12 md:mt-16">
      <motion.div
        className="rounded-[3rem] bg-[#DEF29B] p-6 md:p-12 lg:p-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Column */}
          <motion.div className="md:w-2/3 lg:w-3/4 flex flex-col justify-between space-y-8 md:space-y-12" variants={itemVariants}>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#022F2B] text-left"
              variants={itemVariants}
            >
              Lets Start Making Something Amazing Together.
            </motion.h2>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 md:gap-20 justify-between"
              variants={itemVariants}
            >
              <div>
                <h4 className="text-2xl md:text-3xl text-[#022F2B] font-semibold">Email</h4>
                <motion.p
                  className="text-gray-600 text-lg md:text-xl mt-3 md:mt-5 hover:text-[#FF7536] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  hello@graphic-verse.com
                </motion.p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl text-[#022F2B] font-semibold">Phone</h4>
                <motion.p
                  className="text-gray-600 text-lg md:text-xl mt-3 md:mt-5 hover:text-[#FF7536] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  +62 8901234567
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-end" variants={itemVariants}>
            <motion.button
              className="mt-0 md:mt-0 px-8 md:px-10 py-3 bg-[#FF7536] text-white font-semibold rounded-full text-base md:text-lg shadow-md hover:bg-[#012F2B] hover:text-[#FF7536] transition-all duration-300 w-full md:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start A Project
            </motion.button>

            <ul className="mt-8 md:mt-12 space-y-3 md:space-y-4 text-center md:text-right w-full">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  variants={listItemVariants}
                  custom={index}
                  whileHover={{ x: 5, color: '#FF7536' }}
                  className="text-gray-600 text-lg md:text-xl cursor-pointer hover:text-[#FF7536] transition-colors duration-300 md:ml-18 text-left"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 md:mt-16 pt-8 border-t border-[#022F2B]/20 text-center"
          variants={itemVariants}
        >
          <motion.h5
            className="text-base md:text-xl font-semibold text-[#022F2B]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            COPYRIGHT © Graphic Verse LLC 2026. ALL RIGHTS RESERVED
          </motion.h5>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;