const axios = require("axios");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Polaris Buddy, a cute AI tutor for children. Keep responses simple, fun, educational, and kid-friendly.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Little Polaris",
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.json({
      reply: "Oops! Polaris Buddy needs a recharge 🤖⚡",
    });
  }
};

module.exports = {
  chatWithAI,
};