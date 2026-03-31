import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import data from '../../../public/Experience/experience.json'; // adjust path if needed

const Experience = () => {
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="px-4 py-4 md:px-6 w-full mt-15">
      <motion.div
        ref={ref}
        className="rounded-2xl md:rounded-[3rem] bg-[#DEF29B] p-6 md:p-15"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B] text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          My Experience and Skills
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left side - Experience Timeline */}
          <div className="w-full space-y-8 lg:space-y-10">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={exp.year}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <p className="text-[#FF7537] text-base sm:text-lg md:text-xl">
                  {exp.year}
                </p>
                <h4 className="text-2xl sm:text-3xl font-semibold mt-2">
                  {exp.title}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right side - Skills Progress Bars */}
          <div className="w-full space-y-8 lg:space-y-10 px-2 sm:px-5">
            {data.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="space-y-3 md:space-y-6"
              >
                <h4 className="text-2xl sm:text-3xl font-semibold text-[#0f2a2a]">
                  {skill.name}
                </h4>
                <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF7537] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Experience;