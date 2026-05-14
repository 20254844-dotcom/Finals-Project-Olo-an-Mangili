const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://20254844_db_user:9hUruXiwloNAwIKg@ac-yyxg8ns-shard-00-00.isem07j.mongodb.net:27017,ac-yyxg8ns-shard-00-01.isem07j.mongodb.net:27017,ac-yyxg8ns-shard-00-02.isem07j.mongodb.net:27017/feedback_db?ssl=true&replicaSet=atlas-yd3i56-shard-0&authSource=admin&appName=FinalsFetch&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

// Schema + Model
const feedbackSchema = new mongoose.Schema({
  teacherName: String,
  subject: String,
  rating: Number,
  comments: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// GET all feedbacks
app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single feedback by ID
app.get("/feedbacks/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create feedback
app.post("/feedbacks", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json({ message: "Feedback created successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update feedback
app.put("/feedbacks/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback updated successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE feedback
app.delete("/feedbacks/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));