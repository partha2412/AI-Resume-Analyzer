import { useState } from "react";
import { addJob } from "../services/api.js";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";

export default function JobForm() {
    const { toast, showToast, hideToast } = useToast();
    const [job, setJob] = useState({
        title: "",
        company: "",
        skills: "",
        description: "",
    });

    const submitJob = async () => {
        try {
            const jobPayload = {
                title: job.title,
                company: job.company,
                description: job.description,
                skills: job.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };

            // ✅ BACKEND EXPECTS ARRAY
            const payload = [jobPayload];
            const data = await addJob(payload);
            showToast("Job added successfully", "success");
            setJob({ title: "", company: "", skills: "", description: "" });
        } catch (e) {
            console.error(e);
        }
    };



    return (
        <>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
            <div>
                <h2 className="text-lg font-semibold mb-1">Add Job</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Create a new job posting manually.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Job Title"
                        value={job.title}
                        onChange={(e) => setJob({ ...job, title: e.target.value })}
                    />
                    <Input
                        label="Company"
                        value={job.company}
                        onChange={(e) => setJob({ ...job, company: e.target.value })}
                    />
                </div>

                <Input
                    label="Skills (comma separated)"
                    value={job.skills}
                    onChange={(e) => setJob({ ...job, skills: e.target.value })}
                />

                <Textarea
                    label="Job Description"
                    value={job.description}
                    onChange={(e) => setJob({ ...job, description: e.target.value })}
                />

                <button
                    onClick={submitJob}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Add Job
                </button>
            </div>
        </>
    );
}

/* ---------- Reusable Inputs ---------- */
function Input({ label, ...props }) {
    return (
        <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <input
                {...props}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:border-blue-400"
            />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <textarea
                {...props}
                rows="4"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:border-blue-400"
            />
        </div>
    );
}
