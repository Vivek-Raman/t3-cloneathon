from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from app.database import supabase

router = APIRouter()

@router.get("/")
async def test_endpoint(authorization: Optional[str] = Header(None)):
    """
    A test endpoint that demonstrates JWT handling and Supabase interaction.
    The JWT token should be passed in the Authorization header as 'Bearer <token>'
    """
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    

    token = authorization.split(' ')[1]
    
    try:
        response = supabase.table('test_data').select("*").execute()
        
        return {
            "message": "Success! Your JWT is valid",
            "data": response.data
        }
        
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e)) 