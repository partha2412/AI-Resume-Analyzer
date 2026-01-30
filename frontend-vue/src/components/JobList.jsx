function JobList({ jobs }) {
  return (
    <div>
      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <strong>{job.match_percentage}% match</strong>
        </div>
      ))}
    </div>
  );
}

export default JobList;
