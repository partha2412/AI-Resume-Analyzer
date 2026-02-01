import React, { useState } from "react";
import { uploadResume } from "../services/api";
import MatchResult from "./MatchResult";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);

  // New form fields
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [backlogs, setBacklogs] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSkills([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name) {
      setError("Name and Resume are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSkills([]);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("passing_year", passingYear);
      formData.append("sgpa", sgpa);
      formData.append("backlogs", backlogs);
      formData.append("resume", file);

      const data = await uploadResume(formData);
      const extractedSkills = data.data.skills || [];
      setSkills(extractedSkills);

      console.log(extractedSkills);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-purple-50 border border-purple-200 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
        Resume Analyzer
      </h2>

      {/* Name */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Year */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Passing Year */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">
          Passing Year
        </label>
        <input
          type="number"
          value={passingYear}
          onChange={(e) => setPassingYear(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* SGPA */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">SGPA</label>
        <input
          type="number"
          step="0.01"
          value={sgpa}
          onChange={(e) => setSgpa(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Backlogs */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">
          Current Backlogs
        </label>
        <input
          type="number"
          value={backlogs}
          onChange={(e) => setBacklogs(e.target.value)}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-purple-700 font-medium mb-1">Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="w-full text-purple-700 mb-2"
        />
        {file && <p className="text-green-600 text-sm">Selected: {file.name}</p>}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {/* Result */}
      {skills.length > 0 && <MatchResult skills={skills} />}
    </form>
  );
};

export default ResumeUpload;
