// src/components/admin/ServicesEditor.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultServicesData from "../../WhatIDo/services.json"; // fallback

const CLOUD_NAME = "dohhfubsa";
const UPLOAD_PRESET = "react_unsigned";

// Helper to generate slug from title
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-") 
    .replace(/-+/g, "-"); 
};

const ServicesEditor = () => {
  const [services, setServices] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  // Fetch services from backend
  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/services")
      .then((res) => res.json())
      .then((data) => {
        const fetched = data?.services || defaultServicesData.services;
        setServices(fetched);
        if (fetched.length > 0) setSelectedSlug(fetched[0].slug);
      })
      .catch(() => {
        setServices(defaultServicesData.services);
        if (defaultServicesData.services.length > 0)
          setSelectedSlug(defaultServicesData.services[0].slug);
      });
  }, []);

  // Image upload handler
  const handleImageUpload = async (file, callback) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      callback(data.secure_url);
    } catch {
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Update a field of a specific service
  const updateServiceField = (slug, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, [field]: value } : s))
    );
  };

  // Feature management
  const addFeature = (slug) => {
    setServices((prev) =>
      prev.map((s) =>
        s.slug === slug ? { ...s, features: [...s.features, ""] } : s
      )
    );
  };

  const updateFeature = (slug, index, value) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.slug !== slug) return s;
        const newFeatures = [...s.features];
        newFeatures[index] = value;
        return { ...s, features: newFeatures };
      })
    );
  };

  const removeFeature = (slug, index) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.slug !== slug) return s;
        const newFeatures = s.features.filter((_, i) => i !== index);
        return { ...s, features: newFeatures };
      })
    );
  };

  // Add new service with auto‑generated slug
  const addNewService = () => {
    const baseSlug = generateSlug("New Service");
    const newSlug = `${baseSlug}-${Date.now()}`;
    const newService = {
      title: "New Service",
      slug: newSlug,
      description: "Short description here",
      buttonText: "Learn More",
      longDescription: "Detailed description of the service.",
      features: ["Feature 1", "Feature 2"],
      image: "",
    };
    setServices([...services, newService]);
    setSelectedSlug(newSlug);
  };

  // Delete service
  const deleteService = (slug) => {
    const updated = services.filter((s) => s.slug !== slug);
    setServices(updated);
    if (selectedSlug === slug) {
      setSelectedSlug(updated.length > 0 ? updated[0].slug : null);
    }
  };

  // Save to backend
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("https://grahic-verse-server.vercel.app/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ services }),
      });
      const data = await res.json();
      setMessage(data.message || "Saved!");
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const selectedService = services.find((s) => s.slug === selectedSlug);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#022F2B]">Edit Services</h1>
        <button
          onClick={addNewService}
          className="px-4 py-2 bg-[#FF7536] text-white rounded-lg text-sm hover:bg-[#022F2B] transition"
        >
          + Add New Service
        </button>
      </div>

      {/* Service selector tabs */}
      <div className="flex flex-wrap gap-2 items-center">
        {services.map((s) => (
          <div key={s.slug} className="relative group">
            <button
              onClick={() => setSelectedSlug(s.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedSlug === s.slug
                  ? "bg-[#FF7536] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s.title}
            </button>
            {services.length > 1 && (
              <button
                onClick={() => deleteService(s.slug)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                title="Delete service"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Editor form for selected service */}
      {selectedService && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={selectedService.title}
                onChange={(e) => updateServiceField(selectedSlug, "title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Slug (URL identifier)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedService.slug}
                  onChange={(e) => updateServiceField(selectedSlug, "slug", e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSlug = generateSlug(selectedService.title);
                    updateServiceField(selectedSlug, "slug", newSlug);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 text-sm font-medium transition"
                  title="Generate slug from title"
                >
                  ⟳
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Click ⟳ to auto‑generate from title.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Short Description</label>
            <textarea
              value={selectedService.description}
              onChange={(e) => updateServiceField(selectedSlug, "description", e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Button Text</label>
            <input
              type="text"
              value={selectedService.buttonText}
              onChange={(e) => updateServiceField(selectedSlug, "buttonText", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Long Description</label>
            <textarea
              value={selectedService.longDescription}
              onChange={(e) => updateServiceField(selectedSlug, "longDescription", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Service Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e.target.files[0], (url) =>
                  updateServiceField(selectedSlug, "image", url)
                )
              }
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7536] file:text-white hover:file:bg-[#022F2B]"
            />
            {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
            {selectedService.image && (
              <img src={selectedService.image} alt="Preview" className="mt-3 w-24 h-24 object-cover rounded-xl" />
            )}
          </div>

          {/* Features */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-600">Features</label>
              <button
                type="button"
                onClick={() => addFeature(selectedSlug)}
                className="text-sm text-[#FF7536] hover:text-[#022F2B]"
              >
                + Add Feature
              </button>
            </div>
            {selectedService.features.map((feature, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(selectedSlug, idx, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
                />
                <button
                  onClick={() => removeFeature(selectedSlug, idx)}
                  className="px-3 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && <p className="text-sm text-center text-green-600 font-medium">{message}</p>}

      <motion.button
        onClick={handleSave}
        disabled={saving || uploading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-[#FF7536] text-white font-semibold rounded-xl hover:bg-[#022F2B] transition-all disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </motion.button>

      {/* ========= LIVE PREVIEW ========= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 text-lg mb-4">Live Preview</h2>
        <div className="border border-dashed border-gray-200 rounded-xl overflow-hidden p-4">
          {/* What I Do grid preview */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">What I Do Section</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.slice(0, 5).map((s, idx) => (
                <div key={s.slug} className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl mb-3" />
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                  <p className="text-[#FF7537] text-sm mt-2">{s.buttonText}</p>
                </div>
              ))}
              <div className="bg-[#FF7537] p-4 rounded-xl text-white">
                <p className="text-sm">Request for more</p>
                <h4 className="font-semibold">Have project?</h4>
                <button className="mt-2 px-4 py-1 bg-white text-black text-sm rounded-full">Let's Talk!</button>
              </div>
            </div>
          </div>

          {/* Service Detail preview with smooth animation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Service Detail Page</h3>
            <AnimatePresence mode="wait">
              {selectedService && (
                <motion.div
                  key={selectedSlug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="text-2xl font-bold text-[#022F2B]">{selectedService.title}</h4>
                    <p className="text-gray-700 mt-2">{selectedService.longDescription}</p>
                    <h5 className="font-semibold mt-4 mb-2">What's Included</h5>
                    <ul className="space-y-1">
                      {selectedService.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#FF7537]">✓</span>
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 px-6 py-2 bg-[#FF7537] text-white rounded-full text-sm">
                      Start a Project
                    </button>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
                    {selectedService.image ? (
                      <img src={selectedService.image} alt="Preview" className="max-w-full h-auto rounded-xl" />
                    ) : (
                      <p className="text-gray-400">No image</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesEditor;