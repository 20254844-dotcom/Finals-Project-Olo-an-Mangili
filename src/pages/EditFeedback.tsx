import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

interface Feedback {
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}

const EditFeedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Feedback | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:5000/feedbacks/${id}`);
        const data = await res.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  const handleSubmit = async (data: Feedback) => {
    try {
      await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-7">
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900">Edit Feedback</h1>
            <p className="text-sm text-gray-400 mt-1">
              Update the information below and save your changes.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-6">
            {loading ? (
              <div className="py-10 flex justify-center">
                <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : initialData ? (
              <FeedbackForm initialData={initialData} onSubmit={handleSubmit} isEdit={true} />
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">Record not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;