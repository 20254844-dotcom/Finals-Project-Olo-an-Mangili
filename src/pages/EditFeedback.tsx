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

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:5000/feedbacks/${id}`);
        const data = await res.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
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
    <div>
      <h2>Edit Feedback</h2>
      {initialData && <FeedbackForm initialData={initialData} onSubmit={handleSubmit} />}
    </div>
  );
};

export default EditFeedback;