import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import defaultData from '../../Experience/experience.json'; // adjust path as needed

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Initialize with default JSON data
  const [experiences, setExperiences] = useState(defaultData.experiences);
  const [skills, setSkills] = useState(defaultData.skills);

  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/experience")
      .then((res) => res.json())
      .then((data) => {
        // Only override if DB has actual data (not empty)
        if (data && data.experiences && data.experiences.length > 0) {
          setExperiences(data.experiences);
        }
        if (data && data.skills && data.skills.length > 0) {
          setSkills(data.skills);
        }
      })
      .catch((err) => console.error("Failed to load experience data", err));
  }, []);

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
    <div id='experience' className="w-full py-12 md:py-16">
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
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <p className="text-yellow-500 text-base sm:text-lg md:text-xl">
                    {exp.year}
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-semibold text-white mt-2">
                    {exp.title}
                  </h4>
                  <p className="text-blue-50 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right side - Skills Progress Bars */}
            <div className="w-full space-y-8 lg:space-y-10 px-2 sm:px-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="space-y-3 md:space-y-6"
                >
                  <h4 className="text-2xl sm:text-3xl font-semibold text-white">
                    {skill.name}
                  </h4>
                  <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-500 rounded-full"
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
    </div>
  );
};

export default Experience;