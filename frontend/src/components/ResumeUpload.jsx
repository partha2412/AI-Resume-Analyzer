import React, { useState } from "react";
import { uploadResume } from "../services/api";
import MatchResult from "./MatchResult";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import JobList from "./JobList";
import { matchJobs } from "../services/api";

const ResumeUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skill, setSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false); // 🔥 NEW
  const [matches, setMatches] = useState([]);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [showDashboard, setShowDashboard] = useState(false); // 🔥 NEW
  const [isDragging, setIsDragging] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name) {
      setError("Name and Resume are required.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("passing_year", passingYear);
      formData.append("sgpa", sgpa);
      formData.append("backlogs", backlogs);
      formData.append("resume", file);

      const data = await uploadResume(formData);
      setSkills(data.data.skills);

      const job_data = await matchJobs(
        (data.data.skills).map(
          (skill) => skill.name
        )
      );

      setMatches(job_data.matches);

      // 🔥 trigger animation AFTER success
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error)// || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isSaveDisabled = !name || !file || skill.length === 0;

  const handleDragOver = (e) => {
    e.preventDefault(); // 🔴 REQUIRED
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError("");
      setSkills([]);
    }
  };


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
          ${submitted
            ? "max-h-0 opacity-0 scale-95"
            : "max-h-250 opacity-100 scale-100"
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
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          {/* Label for the file field */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border p-8 w-full rounded-lg border-dashed text-center cursor-pointer
              ${isDragging
                          ? "bg-purple-200 border-purple-600"
                          : "bg-purple-100 border-purple-400"
                        }`}
            onClick={() => document.getElementById("resume-upload").click()}
          >
            {file ? (
              <p className="text-purple-700 font-semibold">{file.name}</p>
            ) : (
              <p className="text-purple-600">
                Drag your resume here or Click to upload
              </p>
            )}
          </div>


        </div>
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-4">
        {!submitted ? (<button
          type="submit"
          disabled={loading || submitted}
          className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>) : null}

        {/* <button
          type="button"
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`w-1/2 py-2 rounded-lg text-white font-semibold transition
            ${isSaveDisabled
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Save
        </button> */}
      </div>

      {/* Result Section */}
      {skill.length > 0 && (
        <>
          <div className="animate-fadeIn">
            <MatchResult skills={skill} />
          </div>
          <p className="mt-10 mb-4 text-gray-700 opacity-60 ">
            Matched jobs based on your skills:
          </p>
          <div>
            <JobList jobs={matches} />
          </div>
        </>
      )}
      {/* 🔥 DASHBOARD APPEARS BELOW */}
      {true && (
        <div className="animate-slideUp">
          <Dashboard />
        </div>
      )}
    </form>
  );
};

export default ResumeUpload;
