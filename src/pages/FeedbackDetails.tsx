import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Feedback {
  _id: string;
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${s <= rating ? "text-amber-400" : "text-gray-200"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
    <span className="text-sm text-gray-400 ml-1.5">{rating} out of 5</span>
  </div>
);

const ratingInfo = (rating: number) => {
  if (rating >= 4) return { label: "Positive", cls: "bg-emerald-50 text-emerald-700" };
  if (rating === 3) return { label: "Neutral", cls: "bg-amber-50 text-amber-700" };
  return { label: "Needs Attention", cls: "bg-red-50 text-red-600" };
};

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const FeedbackDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:5000/feedbacks/${id}`);
        const data = await res.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Feedback record not found.</p>
          <button onClick={() => navigate("/")} className="mt-3 text-blue-500 text-sm hover:underline">
            Back to list
          </button>
        </div>
      </div>
    );
  }

  const badge = ratingInfo(feedback.rating);

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

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 font-semibold text-sm flex items-center justify-center flex-shrink-0">
                {initials(feedback.teacherName)}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">{feedback.teacherName}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{feedback.subject}</p>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.cls}`}>
              {badge.label}
            </span>
          </div>

          <div className="px-6 py-5">
            <div className="grid grid-cols-2 gap-5 mb-6">
              {[
                { label: "Teacher Name", value: feedback.teacherName },
                { label: "Subject", value: feedback.subject },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</p>
                  <p className="text-sm text-gray-700">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Rating</p>
                <StarRating rating={feedback.rating} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Feedback Comments</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 leading-relaxed">
                {feedback.comments || "No comments provided."}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => navigate(`/feedback/edit/${feedback._id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;