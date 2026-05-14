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

const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks, onDelete }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Subject</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((fb) => (
          <tr key={fb._id}>
            <td>{fb.teacherName}</td>
            <td>{fb.subject}</td>
            <td>{fb.rating}</td>
            <td>
              <button onClick={() => navigate(`/feedback/${fb._id}`)}>View</button>
              <button onClick={() => navigate(`/feedback/edit/${fb._id}`)}>Edit</button>
              <button onClick={() => onDelete(fb._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;