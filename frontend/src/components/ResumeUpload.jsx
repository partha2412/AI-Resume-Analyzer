import React, { useState } from "react";
import { uploadResume } from "../services/api";
import MatchResult from "./MatchResult";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

const ResumeUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false); // 🔥 NEW

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [showDashboard, setShowDashboard] = useState(false); // 🔥 NEW


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

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("passing_year", passingYear);
      formData.append("sgpa", sgpa);
      formData.append("backlogs", backlogs);
      formData.append("resume", file);

      const data = await uploadResume(formData);
      setSkills(data.data.skills || []);

      // 🔥 trigger animation AFTER success
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isSaveDisabled = !name || !file || skills.length === 0;

  const handleSave = () => {
    if (isSaveDisabled) return;
        setShowDashboard(true); // ✅ SHOW DASHBOARD

    // navigate("/dashboard", {
    //   state: { name, year, passingYear, sgpa, backlogs, skills },
    // });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-purple-50 border border-purple-200 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center">
        Resume Analyzer
      </h2>

      {/* 🔥 Animated Form Section */}
      <div
        className={`transition-all duration-700 overflow-hidden
          ${
            submitted
              ? "max-h-0 opacity-0 scale-95"
              : "max-h-[1000px] opacity-100 scale-100"
          }`}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Passing Year"
            value={passingYear}
            onChange={(e) => setPassingYear(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            placeholder="SGPA"
            value={sgpa}
            onChange={(e) => setSgpa(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Backlogs"
            value={backlogs}
            onChange={(e) => setBacklogs(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || submitted}
          className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`w-1/2 py-2 rounded-lg text-white font-semibold transition
            ${
              isSaveDisabled
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Save
        </button>
      </div>

      {/* Result Section */}
      {skills.length > 0 && (
        <div className="animate-fadeIn">
          <MatchResult skills={skills} />
        </div>
      )}
 {/* 🔥 DASHBOARD APPEARS BELOW */}
      {showDashboard && (
        <div className="animate-slideUp">
          <Dashboard
            name={name}
            year={year}
            passingYear={passingYear}
            sgpa={sgpa}
            backlogs={backlogs}
            skills={skills}
          />
        </div>
      )}      
     </form> 
  );
};

export default ResumeUpload;
