import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// export const uploadResume = async (file) => {
//   const formData = new FormData();
//   formData.append("resume", file);

//   try {
//     const response = await axios.post(`${BASE_URL}/upload-resume/`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : { error: "Server error" };
//   }
// };

export const uploadResume = async (formData) => {
  return axios.post(
    `${BASE_URL}/resume/upload-resume/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const matchJobs = async (resumeText) => {
  const response = await fetch(
    `${BASE_URL}/matcher/match-jobs/?resume=${encodeURIComponent(resumeText)}`
  );
  //console.log(response);
  
  return response.json();
};

