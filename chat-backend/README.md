# T3 Chat Clone Backend

This is the backend service for the T3 Chat Clone project, built for the T3 Cloneathon competition.

## Features

- Chat history synchronization
- Multiple LLM support
- Real-time chat capabilities (via Supabase Realtime)
- File attachment support (planned)
- Web search integration (planned)

Note: Authentication is handled in the frontend UI using Supabase Auth.

## Tech Stack

- FastAPI
- Supabase (Database and Realtime)
- Pydantic
- Various LLM APIs (Anthropic, Google, OpenAI, Grok, etc)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up Supabase:
   - Get your project URL and anon key from Supabase
   - Copy example.env to .env and update with your Supabase credentials:
```bash
cp example.env .env
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

The project follows a modular structure:
- `app/`: Main application package
  - `api/`: API endpoints
  - `models/`: Data models
  - `config.py`: Configuration settings
  - `database.py`: Supabase client setup
  - `utils.py`: Utility functions

## Supabase Setup

1. Create necessary tables in Supabase:
   - Chats
   - Messages
   - Attachments (planned)

2. Enable Row Level Security (RLS) policies
3. Set up Realtime subscriptions for chat messages 