import React from 'react';
import { useParams, Navigate } from 'react-router';
import { motion } from 'framer-motion';
import portfolioData from '../../public/Recent/portfolio.json';
import image1 from '../assets/img-work1.png';
import image2 from '../assets/img-work2.png';
import image3 from '../assets/img-work3.png';
import image4 from '../assets/img-work4.png';
import image5 from '../assets/img-work5.png';
import image6 from '../assets/img-work6.png';

const imageMap = {
  'img-work1.png': image1,
  'img-work2.png': image2,
  'img-work3.png': image3,
  'img-work4.png': image4,
  'img-work5.png': image5,
  'img-work6.png': image6,
};

const PortfolioDetail = () => {
  const { slug } = useParams();
  const project = portfolioData.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="px-4 py-8 md:px-6 max-w-6xl mx-auto mt-15">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Project Image */}
        <div className="rounded-3xl overflow-hidden mb-8">
          <img
            src={imageMap[project.image]}
            alt={project.heading}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold text-[#022F2B] mb-4">
              {project.heading}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-6">
              {project.fullDescription}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FF7537]">Category:</span>
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FF7537]">Duration:</span>
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FF7537]">Price Range:</span>
                <span>{project.priceRange}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#DEF29B] p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">Project Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>User-centered design approach</li>
              <li>Collaborative development</li>
              <li>Delivered on time and within budget</li>
              <li>Client satisfaction guaranteed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioDetail;