from fastapi import APIRouter
from app.api.v1.chat import router as chat_router
from app.api.v1.message import router as message_router

api_router = APIRouter()

api_router.include_router(chat_router, prefix="/chats", tags=["chats"])
api_router.include_router(message_router, prefix="/messages", tags=["messages"])

