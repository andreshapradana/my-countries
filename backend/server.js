require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const payload = {
      model: "meta/llama-3.1-405b-instruct", // Correct model name
      messages: req.body.messages,
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false, // Set to false since we're not handling streaming yet
    };

    const response = await axios.post(
      "https://integrate.api.nvidia.com/v1/chat/completions", // Correct API endpoint
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
      }
    );

    console.log("AI Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching AI response:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
