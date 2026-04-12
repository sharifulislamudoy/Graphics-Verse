// src/components/admin/PortfolioEditor.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultPortfolioData from "../../Recent/portfolio.json"; // fallback

const CLOUD_NAME = "dohhfubsa";
const UPLOAD_PRESET = "react_unsigned";

// Helper to generate slug from heading
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const PortfolioEditor = () => {
  const [items, setItems] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  // Fetch portfolio from backend
  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const fetched = data?.items || defaultPortfolioData;
        setItems(fetched);
        if (fetched.length > 0) setSelectedSlug(fetched[0].slug);
      })
      .catch(() => {
        setItems(defaultPortfolioData);
        if (defaultPortfolioData.length > 0)
          setSelectedSlug(defaultPortfolioData[0].slug);
      });
  }, []);

  // Image upload handler (supports GIF/PNG/JPG)
  const handleImageUpload = async (file, callback) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      callback(data.secure_url);
    } catch {
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Update a field of a specific item
  const updateItemField = (slug, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, [field]: value } : item
      )
    );
  };

  // Add new portfolio item
  const addNewItem = () => {
    const baseSlug = generateSlug("New Project");
    const newSlug = `${baseSlug}-${Date.now()}`;
    const newItem = {
      slug: newSlug,
      heading: "New Project",
      description: "Short description here",
      image: "",
      fullDescription: "Detailed description of the project.",
      priceRange: "$0 - $0",
      duration: "1 month",
      category: "Category",
    };
    setItems([...items, newItem]);
    setSelectedSlug(newSlug);
  };

  // Delete item
  const deleteItem = (slug) => {
    const updated = items.filter((item) => item.slug !== slug);
    setItems(updated);
    if (selectedSlug === slug) {
      setSelectedSlug(updated.length > 0 ? updated[0].slug : null);
    }
  };

  // Save to backend
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("https://grahic-verse-server.vercel.app/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      setMessage(data.message || "Saved!");
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const selectedItem = items.find((item) => item.slug === selectedSlug);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#022F2B]">Edit Portfolio</h1>
        <button
          onClick={addNewItem}
          className="px-4 py-2 bg-[#FF7536] text-white rounded-lg text-sm hover:bg-[#022F2B] transition"
        >
          + Add New Project
        </button>
      </div>

      {/* Item selector tabs */}
      <div className="flex flex-wrap gap-2 items-center">
        {items.map((item) => (
          <div key={item.slug} className="relative group">
            <button
              onClick={() => setSelectedSlug(item.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedSlug === item.slug
                  ? "bg-[#FF7536] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.heading}
            </button>
            {items.length > 1 && (
              <button
                onClick={() => deleteItem(item.slug)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                title="Delete project"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Editor form for selected item */}
      {selectedItem && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Heading
              </label>
              <input
                type="text"
                value={selectedItem.heading}
                onChange={(e) =>
                  updateItemField(selectedSlug, "heading", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Slug (URL identifier)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedItem.slug}
                  onChange={(e) =>
                    updateItemField(selectedSlug, "slug", e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSlug = generateSlug(selectedItem.heading);
                    updateItemField(selectedSlug, "slug", newSlug);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 text-sm font-medium transition"
                  title="Generate slug from heading"
                >
                  ⟳
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Click ⟳ to auto‑generate from heading.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Short Description
            </label>
            <textarea
              value={selectedItem.description}
              onChange={(e) =>
                updateItemField(selectedSlug, "description", e.target.value)
              }
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <input
                type="text"
                value={selectedItem.category}
                onChange={(e) =>
                  updateItemField(selectedSlug, "category", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={selectedItem.duration}
                onChange={(e) =>
                  updateItemField(selectedSlug, "duration", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price Range
              </label>
              <input
                type="text"
                value={selectedItem.priceRange}
                onChange={(e) =>
                  updateItemField(selectedSlug, "priceRange", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Description
            </label>
            <textarea
              value={selectedItem.fullDescription}
              onChange={(e) =>
                updateItemField(selectedSlug, "fullDescription", e.target.value)
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Project Image (PNG, JPG, GIF)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e.target.files[0], (url) =>
                  updateItemField(selectedSlug, "image", url)
                )
              }
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7536] file:text-white hover:file:bg-[#022F2B]"
            />
            {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt="Preview"
                className="mt-3 w-24 h-24 object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      )}

      {message && (
        <p className="text-sm text-center text-green-600 font-medium">{message}</p>
      )}

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
          {/* Recent Works Grid Preview (first 3 items) */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Recent Works Section</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.slice(0, 3).map((item) => (
                <div key={item.slug} className="bg-gray-50 p-4 rounded-xl">
                  <div className="w-full h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h4 className="font-semibold line-clamp-1">{item.heading}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-[#FF7537] text-sm mt-2">Learn More →</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Detail Preview with animation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Project Detail Page</h3>
            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div
                  key={selectedSlug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="text-2xl font-bold text-[#022F2B]">
                      {selectedItem.heading}
                    </h4>
                    <p className="text-gray-700 mt-2">
                      {selectedItem.fullDescription}
                    </p>
                    <div className="mt-4 space-y-1 text-sm">
                      <p>
                        <span className="font-semibold text-[#FF7537]">
                          Category:
                        </span>{" "}
                        {selectedItem.category}
                      </p>
                      <p>
                        <span className="font-semibold text-[#FF7537]">
                          Duration:
                        </span>{" "}
                        {selectedItem.duration}
                      </p>
                      <p>
                        <span className="font-semibold text-[#FF7537]">
                          Price Range:
                        </span>{" "}
                        {selectedItem.priceRange}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
                    {selectedItem.image ? (
                      <img
                        src={selectedItem.image}
                        alt="Preview"
                        className="max-w-full h-auto rounded-xl"
                      />
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

export default PortfolioEditor;