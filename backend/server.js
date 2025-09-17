import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Debugging API key
console.log("API Key loaded?", process.env.OPENROUTER_API_KEY ? "✅ Yes" : "❌ No");
console.log("Key preview:", process.env.OPENROUTER_API_KEY?.slice(0, 8));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Beki AI Hub backend is running 🚀" });
});

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
