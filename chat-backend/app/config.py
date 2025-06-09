from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "T3 Chat Clone"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    CORS_ORIGINS: List[str] = []
    

    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    REDIRECT_URI: str = ""
    

    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GROK_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    # ...
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 