# AI Chatbot Application

A modern AI-powered chatbot application with real-time conversation capabilities using Google's Gemini AI.

## Project Structure

```
lumi-chatbot/
├── frontend/              # React frontend application
│   ├── src/              # Frontend source code
│   ├── public/           # Public assets
│   ├── package.json      # Frontend dependencies
│   └── ...               # Other frontend files
├── backend/              # Python backend application
│   ├── backend.py        # Flask server
│   ├── agents.py         # AI agents framework
│   ├── gemini_config/    # Gemini configuration
│   ├── .env             # Environment variables
│   ├── requirements.txt # Python dependencies
│   └── ...              # Other backend files
└── README.md            # This file
```

## Deployment Instructions

### Backend Deployment

1. Deploy the contents of the `backend/` folder to your preferred Python hosting platform (e.g., Heroku, PythonAnywhere, Google Cloud Run, etc.)

2. Ensure you configure your environment variables with the Gemini API key:
   ```
   GEMINI_API_KEY='your_api_key_here'
   ```

3. Install Python dependencies:
   ```bash
   pip install flask flask-cors python-dotenv google-generativeai
   ```

4. Run the application:
   ```bash
   python backend.py
   ```

### Frontend Deployment

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Important: Update the backend API URL** before building/deploying:

   Create a `.env.production` file in the frontend directory with your deployed backend URL:
   ```
   VITE_BACKEND_URL=https://your-deployed-backend.com
   ```

   Or you can set the environment variable during the build:
   ```bash
   VITE_BACKEND_URL=https://your-deployed-backend.com npm run build
   ```

4. Build the frontend:
   ```bash
   npm run build
   ```

5. Deploy the built files to your preferred hosting platform (Vercel, Netlify, etc.)

## Local Development

### Running Locally

1. **Backend**: Navigate to the `backend/` directory and run:
   ```bash
   python backend.py
   ```
   The backend will run on `http://localhost:5001`

2. **Frontend**: Navigate to the `frontend/` directory and run:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Changing Backend URL After Deployment

When you deploy your backend to a different URL, you have two options to update the connection:

### Option 1: Environment Variable (Recommended)
Set the `VITE_BACKEND_URL` environment variable during build:
```bash
VITE_BACKEND_URL=https://your-production-backend.com npm run build
```

### Option 2: Update the Code
If you need to update the URL after deployment, modify the `getAIResponse` function in `frontend/src/hooks/useChat.ts`:

```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://your-production-backend.com';
```

## Features

- Real-time chat functionality with AI responses
- Conversation history management
- Responsive design for all device sizes
- Modern UI with clean styling
- Seamless integration with Google Gemini API

## Tech Stack

### Frontend
- React (TypeScript)
- Vite (build tool)
- Tailwind CSS (styling)
- shadcn/ui (components)

### Backend
- Python (Flask)
- Google Generative AI SDK
- CORS support

## API Endpoints

- `POST /api/chat` - Send a message and receive AI response
  - Request body: `{ "message": "user message" }`
  - Response: `{ "response": "AI response" }`

## Security Notes

- Never expose your API keys in client-side code
- The API key should remain in the backend environment
- Always use HTTPS in production
- Implement rate limiting for API usage