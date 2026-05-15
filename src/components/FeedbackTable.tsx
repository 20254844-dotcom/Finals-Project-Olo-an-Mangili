import React from "react";
import { useNavigate } from "react-router-dom";

interface Feedback {
  _id: string;
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}

interface FeedbackTableProps {
  feedbacks: Feedback[];
  onDelete: (id: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400" : "text-gray-200"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
    <span className="text-xs text-gray-400 ml-1">{rating}/5</span>
  </div>
);

const ratingBadge = (rating: number) => {
  if (rating >= 4) return { label: "Positive", cls: "bg-emerald-50 text-emerald-700" };
  if (rating === 3) return { label: "Neutral", cls: "bg-amber-50 text-amber-700" };
  return { label: "Needs Attention", cls: "bg-red-50 text-red-600" };
};

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks, onDelete }) => {
  const navigate = useNavigate();

  if (feedbacks.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="py-16 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-gray-400 text-sm">No feedback records found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Teacher</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Subject</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rating</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, idx) => {
            const badge = ratingBadge(fb.rating);
            return (
              <tr
                key={fb._id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${idx === feedbacks.length - 1 ? "border-b-0" : ""}`}
                onClick={() => navigate(`/feedback/${fb._id}`)}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {initials(fb.teacherName)}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{fb.teacherName}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{fb.subject}</td>
                <td className="px-5 py-3.5"><StarRating rating={fb.rating} /></td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/feedback/${fb._id}`)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-colors bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/feedback/edit/${fb._id}`)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-colors bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(fb._id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-500 hover:border-red-200 hover:text-red-500 transition-colors bg-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;