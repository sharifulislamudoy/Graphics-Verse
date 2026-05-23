// src/components/WhatIDo/WhatIDo.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router';
import image1 from '../../assets/uiux.png';
import image2 from '../../assets/graphic-Design.png';
import image3 from '../../assets/Branding.png';
import image4 from '../../assets/Web-Design.png';
import image5 from '../../assets/Logo-Design.png';
import defaultServicesData from '../../WhatIDo/services.json'; // fallback

const WhatIDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://grahic-verse-server.vercel.app/api/services')
      .then(res => res.json())
      .then(data => {
        if (data && data.services) {
          setServices(data.services);
        } else {
          setServices(defaultServicesData.services);
        }
      })
      .catch(() => {
        setServices(defaultServicesData.services);
      });
  }, []);

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = (slug) => {
    navigate(`/services/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const serviceImages = [image1, image2, image3, image4, image5];

  return (
    <div id="services" className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-gray-800 via-gray-900 to-blue-800 bg-clip-text text-transparent"
            variants={cardVariants}
          >
            What I Do?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10"
            variants={containerVariants}
          >
            {services.slice(0, 5).map((service, index) => (
              <motion.div
                key={service.slug}
                className="flex flex-col bg-white rounded-4xl p-6 md:p-10 gap-6 md:gap-15 shadow-md hover:shadow-xl transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div>
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    className="rounded-2xl w-[70px] h-auto"
                  />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                    {service.description}
                  </p>
                  <button
                    onClick={() => handleLearnMore(service.slug)}
                    className="text-blue-500 font-semibold text-base sm:text-lg md:text-xl mt-5 hover:text-blue-800 transition-colors"
                  >
                    {service.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}

            {/* "Have project?" Card - Blue background only on this card */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-blue-500 to-blue-700 rounded-4xl p-6 md:p-10 gap-6 md:gap-15 shadow-md hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div>
                <p className="text-white text-lg sm:text-xl">Request for more</p>
                <h4 className="text-2xl sm:text-3xl font-semibold text-white">
                  Have project?
                </h4>
              </div>
              <div>
                <button
                  onClick={handleScrollToContact}
                  className="px-6 sm:px-10 py-2 sm:py-3 bg-white text-yellow-500 font-semibold rounded-full text-sm sm:text-base md:text-lg hover:bg-yellow-100 hover:text-yellow-600 transition-all"
                >
                  Let's Talk!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatIDo;