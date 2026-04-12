// src/components/Recent/Recent.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import defaultPortfolioData from '../../Recent/portfolio.json'; // fallback

const Recent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://grahic-verse-server.vercel.app/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setItems(data?.items || defaultPortfolioData);
      })
      .catch(() => {
        setItems(defaultPortfolioData);
      });
  }, []);

  const displayedItems = items.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div id='portfolio' className="px-4 py-4 md:px-6 w-full mt-15">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]" variants={cardVariants}>
          Recent Works
        </motion.h2>
        <motion.p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5 md:w-[60%]" variants={cardVariants}>
          Explore our latest projects that blend creativity with strategy. Each work reflects our commitment to design excellence.
        </motion.p>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10" variants={containerVariants}>
          {displayedItems.map((item) => (
            <motion.div
              key={item.slug}
              className="flex flex-col group"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="rounded-3xl w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 md:mt-5">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold line-clamp-2">
                  {item.heading}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 md:mt-5 line-clamp-2">
                  {item.description}
                </p>
                <Link
                  to={`/portfolio/${item.slug}`}
                  className="inline-block text-[#FF7537] font-semibold text-sm sm:text-base md:text-lg mt-3 md:mt-5 hover:text-[#022F2B] transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link
            to="/portfolio"
            className="px-6 py-3 bg-[#FF7537] text-white font-semibold rounded-full hover:bg-[#022F2B] transition-colors text-sm sm:text-base"
          >
            View All Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Recent;