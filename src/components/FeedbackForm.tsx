import React, { useState, useEffect } from "react";

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
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
    rating: 1,
    comments: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "rating" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="teacherName"
        placeholder="Teacher Name"
        value={formData.teacherName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <select name="rating" value={formData.rating} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <textarea
        name="comments"
        placeholder="Comments"
        value={formData.comments}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;