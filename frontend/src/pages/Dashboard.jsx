import { useState } from "react";
import { matchJobs } from "../services/api";
import JobList from "../components/JobList";

function Dashboard() {
  const [resume, setResume] = useState("");
  const [matches, setMatches] = useState([]);

  const handleMatch = async () => {
    const data = await matchJobs(resume);
    setMatches(data.matches);
  };

  return (
    <div className="min-h-screen p-6 bg-purple-100 flex flex-col items-center">

      {/* Form Card */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md border-t-8 border-purple-500 p-8">
        
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Search for Matching Jobs
        </h1>


        {/* Resume Input */}
        <div className="mb-6">
          {/* <label className="block text-sm font-medium text-gray-700 opacity-55 mb-2">
            Your skills
          </label> */}

          <input
            placeholder="Enter your resume details here..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleMatch}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium"
        >
          Match Jobs
        </button>
      </div>

      {/* Job Results */}
      <div className="w-full max-w-3xl mt-8">
        <JobList jobs={matches} />
      </div>

    </div>
  );
}

export default Dashboard;
