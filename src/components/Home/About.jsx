import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import defaultImage1 from "../../assets/img-vision.png"; // fallback mission image
import defaultImage2 from "../../assets/img-mission.png"; // fallback vision image

const About = () => {
  const [aboutData, setAboutData] = useState({
    mission: {
      title: "Mission",
      description: "To empower brands through innovative design...",
      imageUrl: "",
    },
    vision: {
      title: "Vision",
      description: "To be the world's trusted creative partner...",
      imageUrl: "",
    },
    stats: [
      { value: 80, label: "Complete Project", suffix: "+" },
      { value: 10, label: "Years Experience", suffix: "+" },
      { value: 75, label: "Happy Clients", suffix: "+" },
      { value: 4, label: "Awards Winning", suffix: "+" },
    ],
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mission) {
          setAboutData(data);
        }
      })
      .catch((err) => console.error("Failed to load about data:", err));
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const statVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div id="about" className="px-4 py-4 md:px-6 w-full mt-15">
      <motion.div
        ref={ref}
        className="rounded-2xl md:rounded-[3rem] bg-[#DEF29B] p-6 md:p-15"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]">
              About <br />Graphic Verse LLC
            </h2>
          </motion.div>

          <motion.div
            className="space-y-8 lg:space-y-13"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Mission */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6 md:gap-15"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div className="w-full md:w-1/2" whileHover={{ scale: 1.05 }}>
                <img
                  src={aboutData.mission.imageUrl || defaultImage1}
                  alt="mission illustration"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </motion.div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h4 className="text-2xl sm:text-3xl font-semibold">{aboutData.mission.title}</h4>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                  {aboutData.mission.description}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6 md:gap-15"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div className="w-full md:w-1/2" whileHover={{ scale: 1.05 }}>
                <img
                  src={aboutData.vision.imageUrl || defaultImage2}
                  alt="vision illustration"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </motion.div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h4 className="text-2xl sm:text-3xl font-semibold">{aboutData.vision.title}</h4>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                  {aboutData.vision.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {aboutData.stats.map((stat, index) => (
            <motion.div key={index} variants={statVariants} whileHover={{ y: -5 }} className="text-center">
              <p className="text-2xl md:text-5xl text-[#FF7537] font-semibold">
                <CountUp start={0} end={stat.value} duration={5} />
                {stat.suffix}
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-1 md:mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;