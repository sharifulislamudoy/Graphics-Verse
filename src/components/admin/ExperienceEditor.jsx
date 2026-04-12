import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ExperienceEditor = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetch("https://grahic-verse-server.vercel.app/api/experience")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setExperiences(data.experiences || []);
          setSkills(data.skills || []);
        }
      })
      .catch((err) => console.error("Failed to load experience data", err));
  }, []);

  const addExperience = () => {
    setExperiences([...experiences, { year: "", title: "", description: "" }]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", value: 0 }]);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    if (field === "value") {
      updated[index][field] = parseInt(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setSkills(updated);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("https://grahic-verse-server.vercel.app/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ experiences, skills }),
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
      <h1 className="text-2xl font-bold text-[#022F2B]">Edit Experience & Skills</h1>

      {/* Experiences Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700 text-lg">Experience Timeline</h2>
          <button
            onClick={addExperience}
            className="px-3 py-1 bg-[#FF7536] text-white rounded-lg text-sm hover:bg-[#022F2B]"
          >
            + Add Experience
          </button>
        </div>
        {experiences.map((exp, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500">Year (e.g., 2021-2025)</label>
                <input
                  type="text"
                  value={exp.year}
                  onChange={(e) => updateExperience(idx, "year", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(idx, "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(idx, "description", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg resize-none"
              />
            </div>
            <button
              onClick={() => removeExperience(idx)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-gray-400 text-sm">No experiences added. Click "Add Experience".</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700 text-lg">Skills</h2>
          <button
            onClick={addSkill}
            className="px-3 py-1 bg-[#FF7536] text-white rounded-lg text-sm hover:bg-[#022F2B]"
          >
            + Add Skill
          </button>
        </div>
        {skills.map((skill, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(idx, "name", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Proficiency (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.value}
                  onChange={(e) => updateSkill(idx, "value", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <button
              onClick={() => removeSkill(idx)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-400 text-sm">No skills added. Click "Add Skill".</p>
        )}
      </div>

      {message && <p className="text-sm text-center text-green-600 font-medium">{message}</p>}

      <motion.button
        onClick={handleSave}
        disabled={saving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-[#FF7536] text-white font-semibold rounded-xl hover:bg-[#022F2B] transition-all disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </motion.button>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 text-lg mb-4">Live Preview</h2>
        <div className="border border-dashed border-gray-200 rounded-xl overflow-hidden">
          <div className="rounded-2xl md:rounded-[3rem] bg-[#DEF29B] p-6 md:p-15">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022F2B] text-center mb-8">
              My Experience and Skills
            </h2>
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
              <div className="w-full space-y-6">
                {experiences.length > 0 ? (
                  experiences.map((exp, i) => (
                    <div key={i}>
                      <p className="text-[#FF7537] text-base sm:text-lg md:text-xl">
                        {exp.year || "Year"}
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-semibold mt-2">
                        {exp.title || "Title"}
                      </h4>
                      <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-3">
                        {exp.description || "Description"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No experiences yet.</p>
                )}
              </div>

              <div className="w-full space-y-6">
                {skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-2xl sm:text-3xl font-semibold text-[#0f2a2a]">
                        {skill.name || "Skill"}
                      </h4>
                      <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF7537] rounded-full"
                          style={{ width: `${skill.value || 0}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No skills yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEditor;