import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FeedbackList from "./pages/FeedbackList";
import CreateFeedback from "./pages/CreateFeedback";
import EditFeedback from "./pages/EditFeedback";
import FeedbackDetails from "./pages/FeedbackDetails";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<FeedbackList />} />
        <Route path="/feedback/create" element={<CreateFeedback />} />
        <Route path="/feedback/edit/:id" element={<EditFeedback />} />
        <Route path="/feedback/:id" element={<FeedbackDetails />} />
      </Routes>
    </Router>
  );
};

export default App;