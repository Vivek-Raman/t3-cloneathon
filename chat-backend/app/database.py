from supabase import create_client, Client
from app.config import settings

def get_supabase() -> Client:
    """
    Create and return a Supabase client instance.
    The client is created with the URL and key from config settings.
    """
    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_KEY
    )

supabase: Client = get_supabase() 