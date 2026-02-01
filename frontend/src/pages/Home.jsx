import React from "react";
import ResumeUpload from "../components/ResumeUpload";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-600 mb-6">
          Upload your resume to extract skills using AI
        </p>

        <hr className="mb-6" />

        {/* Form Section */}
        <ResumeUpload />

      </div>
    </div>
  );
};

export default Home;
