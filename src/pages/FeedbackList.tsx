import React, { useEffect, useState } from "react";
import FeedbackTable from "../components/FeedbackTable";

interface Feedback {
  _id: string;
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:5000/feedbacks");
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: "DELETE",
      });
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div>
      <h2>Feedback List</h2>
      <FeedbackTable feedbacks={feedbacks} onDelete={handleDelete} />
    </div>
  );
};

export default FeedbackList;