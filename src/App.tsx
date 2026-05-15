import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import FeedbackList from "./pages/FeedbackList";
import CreateFeedback from "./pages/CreateFeedback";
import EditFeedback from "./pages/EditFeedback";
import FeedbackDetails from "./pages/FeedbackDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
        <Route path="/feedback/create" element={<CreateFeedback />} />
        <Route path="/feedback/edit/:id" element={<EditFeedback />} />
        <Route path="/feedback/:id" element={<FeedbackDetails />} />
      </Routes>
    </Router>
  );
};

export default App;