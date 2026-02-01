import React from "react";

const MatchResult = ({ skills }) => {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Extracted Skills:</h3>
      <ul className="list-disc ml-5">
        {skills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchResult;
