import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

console.log("AI API Key loaded:", process.env.AI_API_KEY ? "✅ Yes" : "❌ No");

const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON from frontend

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Beki AI Hub Backend is Running 🚀" });
});

// Contact form API endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 New contact message received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // For now, we just return a success message
  res.json({
    success: true,
    message: "✅ Your message has been received successfully!",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
