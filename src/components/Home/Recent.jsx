// src/components/Recent/Recent.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';

// Static data (embedded from your JSON)
const portfolioData = [
  {
    slug: "social-media-design-savage-gym",
    heading: "Social Media Design | Savage Gym.",
    description: "We recently completed a bold visual campaign for Savage Gym, a fitness brand known for its raw intensity and no-excuses attitude. The client wanted a grungy and strong visual effect, something that felt as tough as their training style.",
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
    extraImages: ["/images/05.png", "/images/06.png", "/images/07.png", "/images/08.png", "/images/09.png", "/images/10.png", "/images/11.png", "/images/12.png", "/images/13.png"],
  },
{
      slug: "sohaping-a-brand-that-stands-out-and-resonates",
      heading: "Social Media Design | Webinar Campaign 2024",
      description: "We recently completed a clean and compelling set of social media ad creatives for a leading webinar event company. ",
      image: "gifs/1.gif",
      fullDescription:
        "We recently completed a clean and compelling set of social media ad creatives for a leading webinar event company. The goal was to drive sign-ups and establish authority in the virtual event space. We crafted eye-catching designs with clear messaging, bold headlines, and strong CTAs perfectly aligned with the brand’s professional tone and educational focus. These visuals were built to stop the scroll, spark interest, and convert viewers into attendees.",
      priceRange: "$400 - $600",
      duration: "7-30 days",
      category: "Events & Celebrations",
      extraImages: ["/images/14.jpg", "/images/15.jpg", "/images/16.jpg", "/images/17.jpg"],
    },
];

const Recent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  };

  // primary project (index 0) and side projects (index 1 & 2)
  const [primary, side1, side2] = portfolioData;

  return (
    <div id="portfolio" className="px-4 py-6 md:px-6 w-full mt-10">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]" variants={cardVariants}>
          Recent Works
        </motion.h2>
        <motion.p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5 md:w-[70%]" variants={cardVariants}>
          Explore our latest projects that blend creativity with strategy. Each work reflects our commitment to design excellence.
        </motion.p>

        {/* Layout: left 3/4 = primary project, right 1/4 = stacked secondary projects */}
        <motion.div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {/* Primary (3/4 width) */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm"
            variants={cardVariants}
          >
            <Link to={`/portfolio/${primary.slug}`}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thumbnail */}
                <div className="w-full lg:w-1/2">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={primary.image}
                      alt={primary.heading}
                      className="w-full h-72 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500">From: <span className="font-medium">June 2025</span></p>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#022F2B] flex items-center gap-2">
                      {primary.heading}
                    </h3>
                    <p className="text-gray-700 mt-3">{primary.description}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Project cost</p>
                      <p className="text-lg font-semibold text-[#022F2B] mt-1">{primary.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Project duration</p>
                      <p className="text-lg font-semibold text-[#022F2B] mt-1">{primary.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right column: two stacked small cards (each 1/4 width) */}
          <motion.div className="lg:col-span-1 flex flex-col gap-6" variants={cardVariants}>
            {/* Side project 1 */}
            <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center">
              <div className="w-full">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={side1.image}
                    alt={side1.heading}
                    className="w-full h-36 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full mt-3">
                <h4 className="text-md font-semibold text-[#022F2B] line-clamp-2">{side1.heading}</h4>
                <p className="text-sm text-gray-600 mt-2">{side1.description}</p>
                <Link
                  to={`/portfolio/${side1.slug}`}
                  className="mt-3 inline-block text-[#FF7537] font-semibold hover:text-[#022F2B] transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Optional: small card showing total projects count */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center text-center">
              <Link
                to="/portfolio"
                className="text-[#FF7537] font-semibold hover:text-[#022F2B] transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* View all button centered under the grid on small screens */}
        <div className="flex justify-center mt-8 lg:hidden">
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
