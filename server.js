const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // For now, we'll just respond to the single message
    // In a real implementation, you'd want to include the conversation history
    const chat = model.startChat({
      history: history.map(item => ({
        role: item.role, // 'user' or 'model'
        parts: [{ text: item.content }]
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: 'Error communicating with AI service' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});