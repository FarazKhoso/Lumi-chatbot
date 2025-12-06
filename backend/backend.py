from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=api_key)

# Get the model
model = genai.GenerativeModel('gemini-2.0-flash')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')

        # Generate response using the model
        response = model.generate_content(user_message)

        # Extract the text from the response
        response_text = response.text if response.text else "I couldn't generate a response."

        return jsonify({'response': response_text})

    except Exception as e:
        print(f"Error processing chat request: {str(e)}")
        return jsonify({'error': f'Failed to process the request: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)