import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      extraImages: [ "/images/05.png" , "/images/06.png", "/images/07.png", "/images/08.png", "/images/09.png", "/images/10.png", "/images/11.png", "/images/12.png", "/images/13.png"],
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

  // Always scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const project = portfolioData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalImages = project.extraImages?.length || 0;

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image preview section with click and badge */}
          <div
            className="relative rounded-3xl overflow-hidden mb-8 cursor-pointer group"
            onClick={openModal}
          >
            <img
              src={project.image}
              alt={project.heading}
              className="w-full h-auto max-h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Badge showing quantity of images */}
            {totalImages > 0 && (
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{totalImages} {totalImages === 1 ? "image" : "images"}</span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                {project.heading}
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-6">
                {project.fullDescription}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">Category:</span>
                  <span className="text-gray-700">{project.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">Duration:</span>
                  <span className="text-gray-700">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">Price Range:</span>
                  <span className="text-gray-700">{project.priceRange}</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">Project Highlights</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-50">
                <li>User-centered design approach</li>
                <li>Collaborative development</li>
                <li>Delivered on time and within budget</li>
                <li>Client satisfaction guaranteed</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal content - one column of images */}
              <div className="p-4 md:p-6">
                {/* First show the GIF */}
                <div className="mb-6">
                  <img
                    src={project.image}
                    alt={project.heading}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Main GIF</p>
                </div>

                {/* Then show all extra images one by one */}
                {project.extraImages && project.extraImages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Additional Images ({project.extraImages.length})
                    </h3>
                    <div className="flex flex-col gap-4">
                      {project.extraImages.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${project.heading} - image ${idx + 1}`}
                            className="w-full h-auto rounded-lg shadow-md"
                            loading="lazy"
                          />
                          <p className="text-xs text-gray-400 mt-1 text-center">
                            Image {idx + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!project.extraImages || project.extraImages.length === 0) && (
                  <p className="text-center text-gray-500 py-8">
                    No additional images available
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDetail;