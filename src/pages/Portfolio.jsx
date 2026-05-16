import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

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

const Portfolio = () => {
  const portfolioData = [
    {
      slug: "social-media-design-savage-gym",
      heading: "Social Media Design | Savage Gym.",
      description: "We recently completed a bold visual campaign for Savage Gym, a fitness brand known for its raw intensity and no-excuses attitude. The client wanted a grungy and strong visual effect, something that felt as tough as their training style. We delivered a series of high-impact social media designs with gritty textures, bold type, and aggressive energy that matched their brand voice perfectly. With strong CTAs and powerful imagery, this project was built to motivate, engage, and convert serious fitness enthusiasts.",
      image: "/gifs/1.gif",
      fullDescription:
        "We recently completed a bold visual campaign for Savage Gym, a fitness brand known for its raw intensity and no-excuses attitude. The client wanted a grungy and strong visual effect, something that felt as tough as their training style. We delivered a series of high-impact social media designs with gritty textures, bold type, and aggressive energy that matched their brand voice perfectly. With strong CTAs and powerful imagery, this project was built to motivate, engage, and convert serious fitness enthusiasts. The campaign included Instagram posts, stories, and Facebook ads that showcased their latest workout programs and gear. The result was a significant boost in engagement and a surge in new memberships for Savage Gym.",
      priceRange: "$200 - $400",
      duration: "1-7 days",
      category: "Esporte e Fitness",
      extraImages: ["/images/01.png", "/images/02.png", "/images/03.png", "/images/04.png"],
    },
    {
      slug: "martial-art-vol-01-social-media-design",
      heading: "Martial Art Vol. 01 | Social Media Design",
      description: "We just wrapped up an exciting project for a kids-focused martial arts program!",
      image: "/gifs/2.gif",
      fullDescription:
        "We just wrapped up an exciting project for a kids-focused martial arts program! Our portfolio showcases how we brought their powerful message to life through emotionally driven, high-impact social media designs that combine strong CTAs, bold branding, and inspiring visuals, highlighting confidence, discipline, and growth. The campaign included Instagram posts, stories, and Facebook ads that showcased their latest workout programs and gear. The result was a significant boost in engagement and a surge in new memberships for the martial arts program.",
      priceRange: "$200 - $400",
      duration: "1-7 days",
      category: "Arte e Design",
      extraImages: ["/images/05.png" , "/images/06.png", "/images/07.png", "/images/08.png", "/images/09.png", "/images/10.png", "/images/11.png", "/images/12.png", "/images/13.png"],
    },
{
      slug: "sohaping-a-brand-that-stands-out-and-resonates",
      heading: "Social Media Design | Webinar Campaign 2024",
      description: "We recently completed a clean and compelling set of social media ad creatives for a leading webinar event company. ",
      image: "/gifs/1.gif",
      fullDescription:
        "We recently completed a clean and compelling set of social media ad creatives for a leading webinar event company. The goal was to drive sign-ups and establish authority in the virtual event space. We crafted eye-catching designs with clear messaging, bold headlines, and strong CTAs perfectly aligned with the brand’s professional tone and educational focus. These visuals were built to stop the scroll, spark interest, and convert viewers into attendees.",
      priceRange: "$400 - $600",
      duration: "7-30 days",
      category: "Events & Celebrations",
      extraImages: ["/images/14.jpg", "/images/15.jpg", "/images/16.jpg", "/images/17.jpg"],
    },
  ];

  return (
    <div className="px-4 py-4 md:px-6 w-full mt-15">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B] text-center"
          variants={cardVariants}
        >
          All Works
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5 text-center md:w-[60%] mx-auto"
          variants={cardVariants}
        >
          A collection of our finest projects. Each one tells a story of
          creativity and strategic thinking.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10"
          variants={containerVariants}
        >
          {portfolioData.map((item) => (
            <motion.div
              key={item.slug}
              className="flex flex-col group"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
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
      </motion.div>
    </div>
  );
};

export default Portfolio;