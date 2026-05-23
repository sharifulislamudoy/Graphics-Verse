import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import image1 from '../../assets/img-client1.png';
import image2 from '../../assets/img-client2.png';
import image3 from '../../assets/img-client3.png';
import image4 from '../../assets/img-client4.png';
import reviewsData from '../../ClientReview/reviews.json';

// Map imported images to filenames
const imageMap = {
  'img-client1.png': image1,
  'img-client2.png': image2,
  'img-client3.png': image3,
  'img-client4.png': image4,
};

const ClientReview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          className="rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-blue-500 to-blue-700 p-6 md:p-15 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            What My Clients Say
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-13 mt-12 md:mt-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {reviewsData.map((review) => (
              <motion.div
                key={review.name}
                className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-white/20"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Fixed-size image container */}
                <div className="flex-shrink-0 flex justify-center">
                  <img
                    src={imageMap[review.image]}
                    alt={review.name}
                    className="rounded-2xl w-40 h-40 md:w-48 md:h-48 object-cover border-2 border-white/30"
                  />
                </div>

                {/* Text container – takes remaining space and centers vertically */}
                <div className="flex flex-col justify-center text-center md:text-left flex-1">
                  <h4 className="text-2xl sm:text-3xl font-semibold text-white">
                    {review.name}
                  </h4>
                  <div className="mt-3">
                    <i className="text-blue-50 text-base md:text-lg block">
                      "{review.review}"
                    </i>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientReview;