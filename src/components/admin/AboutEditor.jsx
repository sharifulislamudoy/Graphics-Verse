import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import defaultMissionImg from "../../assets/img-vision.png";
import defaultVisionImg from "../../assets/img-mission.png";

const CLOUD_NAME = "dohhfubsa";
const UPLOAD_PRESET = "react_unsigned";

const AboutEditor = () => {
  const [brandDescription, setBrandDescription] = useState("");
  const [mission, setMission] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [vision, setVision] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [stats, setStats] = useState([]);
  const [uploadingMission, setUploadingMission] = useState(false);
  const [uploadingVision, setUploadingVision] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  // Fetch existing about data
  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.mission) {
          setBrandDescription(data.brandDescription || "");
          setMission({
            title: data.mission.title || "",
            description: data.mission.description || "",
            imageUrl: data.mission.imageUrl || "",
          });
          setVision({
            title: data.vision.title || "",
            description: data.vision.description || "",
            imageUrl: data.vision.imageUrl || "",
          });
          setStats(data.stats || []);
        }
      })
      .catch((err) => console.error("Failed to load about data", err));
  }, []);

  // Image upload handler
  const handleImageUpload = async (file, setImageUrl, setUploading) => {
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

  // Stats management
  const addStat = () => {
    setStats([...stats, { value: 0, label: "", suffix: "" }]);
  };

  const updateStat = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("https://grahic-verse-server.vercel.app/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brandDescription, mission, vision, stats }),
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
      <h1 className="text-2xl font-bold text-[#022F2B]">Edit About Section</h1>

      {/* Brand Description Editor */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg">Brand Description</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company Overview (shown next to "About Graphic Verse LLC" heading)
          </label>
          <textarea
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536] resize-none"
            placeholder="At Graphicverse LLC, we believe design is more than just visuals..."
          />
        </div>
      </div>

      {/* Mission Editor */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg">Mission</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={mission.title}
            onChange={(e) => setMission({ ...mission, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            value={mission.description}
            onChange={(e) => setMission({ ...mission, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536] resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Mission Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(
                e.target.files[0],
                (url) => setMission({ ...mission, imageUrl: url }),
                setUploadingMission
              )
            }
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7536] file:text-white hover:file:bg-[#022F2B] cursor-pointer"
          />
          {uploadingMission && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
          {mission.imageUrl && (
            <img src={mission.imageUrl} alt="Mission preview" className="mt-3 w-24 h-24 object-cover rounded-xl" />
          )}
        </div>
      </div>

      {/* Vision Editor */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-gray-700 text-lg">Vision</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={vision.title}
            onChange={(e) => setVision({ ...vision, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            value={vision.description}
            onChange={(e) => setVision({ ...vision, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7536] resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Vision Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(
                e.target.files[0],
                (url) => setVision({ ...vision, imageUrl: url }),
                setUploadingVision
              )
            }
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF7536] file:text-white hover:file:bg-[#022F2B] cursor-pointer"
          />
          {uploadingVision && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
          {vision.imageUrl && (
            <img src={vision.imageUrl} alt="Vision preview" className="mt-3 w-24 h-24 object-cover rounded-xl" />
          )}
        </div>
      </div>

      {/* Stats Editor */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700 text-lg">Statistics</h2>
          <button
            onClick={addStat}
            className="px-3 py-1 bg-[#FF7536] text-white rounded-lg text-sm hover:bg-[#022F2B]"
          >
            + Add Stat
          </button>
        </div>
        {stats.map((stat, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Value (number)</label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(idx, "value", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(idx, "label", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Suffix (e.g., +, %)</label>
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => updateStat(idx, "suffix", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={() => removeStat(idx)}
                className="self-end px-3 py-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {stats.length === 0 && <p className="text-gray-400 text-sm">No stats added. Click "Add Stat".</p>}
      </div>

      {message && <p className="text-sm text-center text-green-600 font-medium">{message}</p>}

      <motion.button
        onClick={handleSave}
        disabled={saving || uploadingMission || uploadingVision}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-[#FF7536] text-white font-semibold rounded-xl hover:bg-[#022F2B] transition-all disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </motion.button>

      {/* LIVE PREVIEW SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 text-lg mb-4">Live Preview</h2>
        <div className="border border-dashed border-gray-200 rounded-xl overflow-hidden">
          <div className="rounded-2xl md:rounded-[3rem] bg-[#DEF29B] p-6 md:p-15">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B]">
                  About <br />Graphic Verse LLC
                </h2>
                <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-6 leading-relaxed">
                  {brandDescription || "At Graphicverse LLC, we believe design is more than just visuals, it is a powerful tool to communicate, connect, and convert. We are a creative design studio specializing in high-impact digital graphics tailored for modern brands. From social media ads to web banners and marketing creatives, our focus is simple: create designs that not only look great but also deliver real results."}
                </p>
              </div>

              <div className="space-y-8 lg:space-y-13">
                {/* Mission Block */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15">
                  <div className="w-full md:w-1/2">
                    <img
                      src={mission.imageUrl || defaultMissionImg}
                      alt="mission illustration"
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h4 className="text-2xl sm:text-3xl font-semibold">{mission.title || "Mission"}</h4>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                      {mission.description || "To empower brands through innovative design — crafting logos, flyers, and social media visuals that drive engagement."}
                    </p>
                  </div>
                </div>

                {/* Vision Block */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15">
                  <div className="w-full md:w-1/2">
                    <img
                      src={vision.imageUrl || defaultVisionImg}
                      alt="vision illustration"
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h4 className="text-2xl sm:text-3xl font-semibold">{vision.title || "Vision"}</h4>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3 md:mt-5">
                      {vision.description || "To be the world's trusted creative partner, making exceptional design accessible to every brand, big or small."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20">
              {stats.length > 0 ? (
                stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="md:text-5xl text-2xl text-[#FF7537] font-semibold">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-1 md:mt-2">{stat.label}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="text-center"><p className="text-5xl font-semibold text-[#FF7537]">80+</p><p className="text-sm">Complete Project</p></div>
                  <div className="text-center"><p className="text-5xl font-semibold text-[#FF7537]">10+</p><p className="text-sm">Years Experience</p></div>
                  <div className="text-center"><p className="text-5xl font-semibold text-[#FF7537]">75+</p><p className="text-sm">Happy Clients</p></div>
                  <div className="text-center"><p className="text-5xl font-semibold text-[#FF7537]">4+</p><p className="text-sm">Awards Winning</p></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;