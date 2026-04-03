import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import image1 from '../../assets/uiux.png';
import image2 from '../../assets/graphic-Design.png';
import image3 from '../../assets/Branding.png';
import image4 from '../../assets/Web-Design.png';
import image5 from '../../assets/Logo-Design.png';
import servicesData from '../../WhatIDo/services.json';

const WhatIDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Map imported images to service order (matching the JSON order)
  const serviceImages = [image1, image2, image3, image4, image5];

  return (
    <div id='services' className="px-4 py-4 md:px-6 w-full mt-15">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B] text-center"
          variants={cardVariants}
        >
          What I Do?
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10"
          variants={containerVariants}
        >
          {/* Map services */}
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.title}
              className="flex flex-col bg-white rounded-4xl p-6 md:p-10 gap-6 md:gap-15 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div>
                <img
                  src={serviceImages[index]}
                  alt={service.title}
                  className="rounded-2xl w-[70px] h-auto"
                />
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-semibold">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                  {service.description}
                </p>
                <button className="text-[#FF7537] font-semibold text-base sm:text-lg md:text-xl mt-5 hover:text-[#022F2B] transition-colors">
                  {service.buttonText}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Special "Have project?" Card */}
          <motion.div
            className="flex flex-col bg-[#FF7537] rounded-4xl p-6 md:p-10 gap-6 md:gap-15 hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div>
              <p className="text-white text-lg sm:text-xl">
                Request for more
              </p>
              <h4 className="text-2xl sm:text-3xl font-semibold text-white">
                Have project?
              </h4>
            </div>
            <div>
              <button
                onClick={handleScrollToContact}
                className="px-6 sm:px-10 py-2 sm:py-3 bg-white text-black font-semibold rounded-full text-sm sm:text-base md:text-lg hover:bg-[#022F2B] hover:text-white transition-all">
                Let's Talk!
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatIDo;