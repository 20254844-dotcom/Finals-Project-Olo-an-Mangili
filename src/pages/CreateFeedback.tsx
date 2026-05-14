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
      alert("Thank you for your feedback! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  return (
    <div>
      <h2>Add Feedback</h2>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateFeedback;