import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import image1 from '../../assets/img-vision.png';
import image2 from '../../assets/img-mission.png';
import CountUp from 'react-countup';
import content from '../../../public/Refreshing/content.json';

const Refreshing = () => {
  const { mission, vision, stats } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const statVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className='px-4 py-4 md:px-6 w-full mt-15'>
      <motion.div
        ref={ref}
        className='rounded-[3rem] bg-[#DEF29B] p-15'
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header and Mission/Vision Section */}
        <div className='grid grid-cols-2 gap-8'>
          {/* Left side heading */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className='text-5xl font-semibold text-[#022F2B]'>
              Creative Design with Refreshing Ideas
            </h2>
          </motion.div>

          {/* Right side mission & vision */}
          <motion.div
            className='space-y-13'
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Mission Block */}
            <motion.div
              className='flex justify-between items-center gap-15'
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image1}
                  alt="mission illustration"
                  className='rounded-2xl w-[500px] h-auto'
                />
              </motion.div>
              <div>
                <h4 className='text-3xl font-semibold'>{mission.title}</h4>
                <p className='text-gray-600 text-xl mt-5'>{mission.description}</p>
              </div>
            </motion.div>

            {/* Vision Block */}
            <motion.div
              className='flex justify-between items-center gap-15'
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image2}
                  alt="vision illustration"
                  className='rounded-2xl w-[500px] h-auto'
                />
              </motion.div>
              <div>
                <h4 className='text-3xl font-semibold'>{vision.title}</h4>
                <p className='text-gray-600 text-xl mt-5'>{vision.description}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          className='grid md:grid-cols-4 grid-cols-2 mt-20 gap-8'
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <p className='text-8xl text-[#FF7537] font-semibold'>
                <CountUp start={0} end={stat.value} duration={5} />
                {stat.suffix}
              </p>
              <p className='text-xl mt-2'>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Refreshing;