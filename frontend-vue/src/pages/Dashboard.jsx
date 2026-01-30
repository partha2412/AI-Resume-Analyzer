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
    <div>
      <h1>Job Matcher Dashboard</h1>

      <input
        className="border p-2"
        placeholder="Enter resume text"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button onClick={handleMatch}>Match Jobs</button>

      <JobList jobs={matches} />
    </div>
  );
}

export default Dashboard;
