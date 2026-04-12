// src/pages/PortfolioDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router';
import { motion } from 'framer-motion';
import defaultPortfolioData from '../Recent/portfolio.json';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://grahic-verse-server.vercel.app/api/portfolio')
      .then(res => res.json())
      .then(data => {
        const items = data?.items || defaultPortfolioData;
        const found = items.find(p => p.slug === slug);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => {
        const found = defaultPortfolioData.find(p => p.slug === slug);
        setProject(found || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
        <div className="rounded-3xl overflow-hidden mb-8">
          <img
            src={project.image}
            alt={project.heading}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

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