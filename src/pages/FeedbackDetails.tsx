import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Feedback {
  _id: string;
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}

const FeedbackDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:5000/feedbacks/${id}`);
        const data = await res.json();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [id]);

  if (!feedback) return <p>Loading...</p>;

  return (
    <div>
      <h2>Feedback Details</h2>
      <p><strong>Teacher Name:</strong> {feedback.teacherName}</p>
      <p><strong>Subject:</strong> {feedback.subject}</p>
      <p><strong>Rating:</strong> {feedback.rating}</p>
      <p><strong>Comments:</strong> {feedback.comments}</p>
      <button onClick={() => navigate(`/feedback/edit/${feedback._id}`)}>Edit</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default FeedbackDetails;