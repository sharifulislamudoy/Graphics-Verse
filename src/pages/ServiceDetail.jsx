// src/pages/ServiceDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import defaultServicesData from '../WhatIDo/services.json';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://grahic-verse-server.vercel.app/api/services')
      .then(res => res.json())
      .then(data => {
        const services = data?.services || defaultServicesData.services;
        const found = services.find(s => s.slug === slug);
        setService(found || null);
        setLoading(false);
      })
      .catch(() => {
        const found = defaultServicesData.services.find(s => s.slug === slug);
        setService(found || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Service not found</h2>
          <Link to="/" className="text-[#FF7537] hover:text-[#022F2B] font-semibold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center text-[#FF7537] hover:text-[#022F2B] font-medium mb-8">← Back to Services</Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-[#022F2B] mb-6">
            {service.title}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-gray-700 mb-8">
            {service.longDescription}
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-semibold text-[#022F2B] mb-4">What's Included</h2>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#FF7537] text-xl mt-0.5">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#FF7537] text-white font-semibold rounded-full hover:bg-[#022F2B] transition-colors"
            >
              Start a Project
            </button>
          </motion.div>
        </div>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-100 rounded-3xl p-8 flex items-center justify-center">
          {service.image ? (
            <img src={service.image} alt={service.title} className="max-w-full h-auto rounded-2xl" />
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-lg">Service illustration</p>
              <p className="text-sm mt-2">(Add an image URL in the editor)</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;