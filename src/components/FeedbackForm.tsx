import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface FeedbackFormProps {
  initialData?: {
    teacherName: string;
    subject: string;
    rating: number;
    comments: string;
  };
  onSubmit: (data: {
    teacherName: string;
    subject: string;
    rating: number;
    comments: string;
  }) => void;
  isEdit?: boolean;
  cancelPath?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  initialData,
  onSubmit,
  isEdit = false,
  cancelPath = "/feedbacks",
}) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
    rating: 0,
    comments: "",
  });
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "rating" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Teacher Name <span className="text-blue-500">*</span>
          </label>
          <input
            type="text"
            name="teacherName"
            placeholder="e.g. Mr. Reyes"
            value={formData.teacherName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Subject <span className="text-blue-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            placeholder="e.g. Mathematics"
            value={formData.subject}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Overall Rating <span className="text-blue-500">*</span>
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 transition-colors ${
                  star <= (hovered || formData.rating)
                    ? "text-amber-400"
                    : "text-gray-200"
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
          {formData.rating > 0 && (
            <span className="text-sm text-gray-400 ml-2">{formData.rating} / 5</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1">Click a star to rate</p>
      </div>

      <div>
        <label className={labelClass}>
          Comments <span className="text-blue-500">*</span>
        </label>
        <textarea
          name="comments"
          placeholder="Write your feedback about the teacher's performance, teaching style, communication, etc."
          value={formData.comments}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="border-t border-gray-100 pt-4 flex justify-end gap-3">
        <Link
          to={cancelPath}
          className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          {isEdit ? "Save Changes" : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;