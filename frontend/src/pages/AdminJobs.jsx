import { useState } from "react";
import JobForm from "../components/JobForm";
import JobCSVUpload from "../components/JobCSVUpload.jsx";

export default function AdminJobs() {
  const [activeTab, setActiveTab] = useState("csv");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Manage job listings for resume matching
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabButton
            label="Upload via CSV"
            active={activeTab === "csv"}
            onClick={() => setActiveTab("csv")}
          />
          <TabButton
            label="Add Job Manually"
            active={activeTab === "manual"}
            onClick={() => setActiveTab("manual")}
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          {activeTab === "csv" ? <JobCSVUpload /> : <JobForm />}
        </div>
      </main>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          active
            ? "bg-blue-600 text-white shadow"
            : "bg-white text-gray-600 border hover:bg-gray-50"
        }
      `}
    >
      {label}
    </button>
  );
}
