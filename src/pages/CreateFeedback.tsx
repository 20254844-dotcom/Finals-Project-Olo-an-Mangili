import React from "react";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

const CreateFeedback: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    teacherName: string;
    subject: string;
    rating: number;
    comments: string;
  }) => {
    try {
      await fetch("http://localhost:5000/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Feedback created successfully! Thank you for your feedback. ");
      navigate("/");
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to list
        </button>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-7">
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900">New Feedback Record</h1>
            <p className="text-sm text-gray-400 mt-1">
              Fill in the fields below to submit feedback for a teacher.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <FeedbackForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;