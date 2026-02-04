import { useState } from "react";
import axios from "axios";

export default function JobCSVUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* ---------- Drag & Drop ---------- */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
    } else {
      alert("Please upload a valid CSV file");
    }
  };

  /* ---------- Upload ---------- */
  const uploadCSV = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(
        "http://127.0.0.1:8000/api/jobs/upload-csv/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Jobs uploaded successfully");
      setFile(null);
    } catch (error) {
      alert("CSV upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Bulk Upload Jobs</h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload multiple jobs at once using a CSV file.
      </p>

      <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
        {/* Hidden input */}
        <input
          type="file"
          accept=".csv"
          id="job-upload"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("job-upload").click()}
          className={`h-32 flex items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition
            ${
              isDragging
                ? "bg-purple-200 border-purple-600"
                : "bg-purple-100 border-purple-400 hover:bg-purple-200"
            }`}
        >
          {file ? (
            <p className="text-purple-700 font-semibold">{file.name}</p>
          ) : (
            <p className="text-purple-600">
              Drag & drop your CSV file here or click to browse
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={uploadCSV}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg
                     hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Required columns: title, company, skills, description
        </p>
      </div>
    </div>
  );
}
