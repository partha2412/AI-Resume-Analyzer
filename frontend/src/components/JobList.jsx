function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) return null;

  // ✅ FILTER LOGIC (skills matched)
  const matchedJobs = jobs.filter(
    (job) => job.match_percentage > 0
  );

  if (matchedJobs.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No skill-matched jobs found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {matchedJobs.map((job, index) => (
        <div
          key={index}
          className="bg-white border-l-4 border-purple-500 rounded-md shadow-sm p-5"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {job.title}
          </h2>

          <p className="text-gray-600 mt-1">
            {job.company}
          </p>

          <p className="text-sm text-purple-600 mt-2">
            Match Score: {job.match_percentage}%
          </p>
        </div>
      ))}
    </div>
  );
}

export default JobList;
