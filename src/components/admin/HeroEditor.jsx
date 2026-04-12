import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import defaultImage from "../../assets/hero-image.png";

const CLOUD_NAME = "dohhfubsa";
const UPLOAD_PRESET = "react_unsigned";

const HeroEditor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.imageUrl) setImageUrl(data.imageUrl);
      });
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
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
      setImageUrl(data.secure_url);
    } catch {
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("https://grahic-verse-server.vercel.app/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, imageUrl }),
      });
      const data = await res.json();
      setMessage(data.message || "Saved!");
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#022F2B]">Edit Hero Section</h1>

      {/* Editor Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg">Content Editor</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Graphic Designer"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536] text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Write your hero description..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536] text-gray-800 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Hero Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7536] file:text-white hover:file:bg-[#022F2B] cursor-pointer"
          />
          {uploading && (
            <p className="text-sm text-gray-400 mt-2">Uploading image...</p>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-3 w-24 h-24 object-cover rounded-xl"
            />
          )}
        </div>

        {message && (
          <p className="text-sm text-center text-green-600 font-medium">
            {message}
          </p>
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
      </div>

      {/* Live Preview - exact same layout as Hero.jsx */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 text-lg mb-4">
          Live Preview
        </h2>

        {/* This mirrors Hero.jsx layout exactly */}
        <div className="border border-dashed border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-10">
            {/* Left Side - Image */}
            <div className="w-full md:w-2/5 lg:w-1/3 flex justify-center">
              <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
                <img
                  src={imageUrl || defaultImage}
                  alt="Profile"
                  className="rounded-2xl sm:rounded-3xl md:rounded-[3rem] object-cover w-full h-auto shadow-lg"
                />
              </div>
            </div>

            {/* Right Side - Text */}
            <div className="text-center md:text-left w-full md:w-3/5 lg:w-2/3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#022F2B] leading-tight">
                {title || "Your Title Here"}
              </h1>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto md:mx-0">
                {description || "Your description will appear here..."}
              </p>

              <button className="mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FF7536] text-white font-semibold rounded-full text-sm sm:text-base shadow-md">
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;